import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TranslationBaseComponent } from '../../@shared/language-base/translation-base.component';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '../../@core/services/store.service';
import { first, filter, debounceTime, withLatestFrom } from 'rxjs/operators';
import { NbDialogService, NbPopoverDirective } from '@nebular/theme';
import { EditObjectiveComponent } from './edit-objective/edit-objective.component';
import { EditKeyResultsComponent } from './edit-keyresults/edit-keyresults.component';
import { GoalDetailsComponent } from './goal-details/goal-details.component';
import {
	IGoal,
	IKeyResult,
	IGoalGeneralSetting,
	IOrganization
} from '@gauzy/models';
import { SelectedEmployee } from '../../@theme/components/header/selectors/employee/employee.component';
import { KeyResultUpdateComponent } from './keyresult-update/keyresult-update.component';
import { GoalService } from '../../@core/services/goal.service';
import { KeyResultService } from '../../@core/services/keyresult.service';
import { ErrorHandlingService } from '../../@core/services/error-handling.service';
import { KeyResultDetailsComponent } from './keyresult-details/keyresult-details.component';
import { KeyResultParametersComponent } from './key-result-parameters/key-result-parameters.component';
import { GoalLevelEnum } from '@gauzy/models';
import { GoalSettingsService } from '../../@core/services/goal-settings.service';
import { GoalTemplateSelectComponent } from '../../@shared/goal/goal-template-select/goal-template-select.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from '../../@core/services/toastr.service';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'ga-goals',
	templateUrl: './goals.component.html',
	styleUrls: ['./goals.component.scss']
})
export class GoalsComponent
	extends TranslationBaseComponent
	implements OnInit, OnDestroy {
	@ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
	loading = true;
	selectedOrganizationId: string;
	organizationName: string;
	employee: SelectedEmployee;
	isEmployee = false;
	selectedFilter = 'all';
	objectiveGroup = 'timeFrames';
	goalGeneralSettings: IGoalGeneralSetting;
	goalTimeFrames: Array<string> = [];
	filters = [
		{
			title: this.getTranslation('GOALS_PAGE.ALL_OBJECTIVES'),
			value: 'all'
		},
		{
			title: this.getTranslation('GOALS_PAGE.MY_TEAMS_OBJECTIVES'),
			value: 'team'
		},
		{
			title: this.getTranslation(
				'GOALS_PAGE.MY_ORGANIZATIONS_OBJECTIVES'
			),
			value: 'organization'
		},
		{
			title: this.getTranslation('GOALS_PAGE.MY_OBJECTIVES'),
			value: 'employee'
		}
	];
	goalLevels = [...Object.values(GoalLevelEnum)];
	groupObjectivesBy = [
		{
			title: this.getTranslation('GOALS_PAGE.OBJECTIVE_LEVEL'),
			value: 'level'
		},
		{
			title: this.getTranslation('GOALS_PAGE.TIME_FRAME'),
			value: 'timeFrames'
		}
	];
	goals: IGoal[];
	allGoals: IGoal[];
	noGoals = true;
	keyResult: IKeyResult[];
	organization: IOrganization;

	constructor(
		private store: Store,
		readonly translateService: TranslateService,
		private dialogService: NbDialogService,
		private toastrService: ToastrService,
		private goalService: GoalService,
		private errorHandler: ErrorHandlingService,
		private keyResultService: KeyResultService,
		private goalSettingsService: GoalSettingsService
	) {
		super(translateService);
	}

	ngOnInit() {
		this.store.user$
			.pipe(
				filter((user) => !!user),
				untilDestroyed(this)
			)
			.subscribe((user) => {
				if (user) {
					this.isEmployee = !!user.employee;
				}
			});

		const storeEmployee$ = this.store.selectedEmployee$;
		const storeOrganization$ = this.store.selectedOrganization$;
		storeEmployee$
			.pipe(
				filter((employee) => !!employee),
				debounceTime(200),
				withLatestFrom(storeOrganization$),
				untilDestroyed(this)
			)
			.subscribe(([employee]) => {
				if (employee.id && this.organization) {
					this.employee = employee;
					this.loadPage();
				}
			});
		storeOrganization$
			.pipe(
				filter((organization) => !!organization),
				debounceTime(200),
				withLatestFrom(storeEmployee$),
				untilDestroyed(this)
			)
			.subscribe(([organization, employee]) => {
				this.employee = employee || null;
				if (organization) {
					this.organization = organization;
					this.organizationName = organization.name;
					this.selectedOrganizationId = organization.id;
					this.loadPage();
				}
			});
	}

	async getGoalSettings(findObj) {
		await this.goalSettingsService
			.getAllGeneralSettings(findObj)
			.then((res) => {
				const { items } = res;
				this.goalGeneralSettings = items.pop();
			});
	}

	private async loadPage() {
		if (!this.organization) {
			return;
		}
		this.loading = true;

		const { tenantId } = this.store.user;
		const findObj = {
			organizationId: this.selectedOrganizationId,
			tenantId
		};
		await this.getGoalSettings(findObj);
		await this.goalService
			.getAllGoals(
				[
					'keyResults',
					'keyResults.updates',
					'keyResults.goal',
					'ownerEmployee',
					'ownerEmployee.user',
					'organization',
					'ownerTeam',
					'lead',
					'lead.user',
					'keyResults.owner',
					'keyResults.lead',
					'alignedKeyResult',
					'alignedKeyResult.goal',
					'alignedKeyResult.goal.ownerEmployee',
					'alignedKeyResult.goal.ownerEmployee.user',
					'alignedKeyResult.goal.organization',
					'alignedKeyResult.goal.ownerTeam',
					'alignedKeyResult.owner',
					'alignedKeyResult.lead',
					'alignedKeyResult.updates'
				],
				findObj
			)
			.then((goals) => {
				if (goals) {
					this.noGoals = goals.items.length > 0 ? false : true;
					this.goals = goals.items;
					this.allGoals = goals.items;
					if (!!this.selectedFilter) {
						this.filterGoals(this.selectedFilter, this.allGoals);
					}
					this.loading = false;
				}
			});
	}

	async openKeyResultParameters(index, keyResult) {
		const dialog = this.dialogService.open(KeyResultParametersComponent, {
			context: {
				data: {
					selectedKeyResult: keyResult,
					allKeyResults: this.goals[index].keyResults,
					settings: this.goalGeneralSettings,
					orgId: this.selectedOrganizationId
				}
			},
			closeOnBackdropClick: false
		});
		const response = await dialog.onClose.pipe(first()).toPromise();
		if (!!response) {
			this.goals[index].progress = this.calculateGoalProgress(
				this.goals[index].keyResults
			);
			const goalData = this.goals[index];
			delete goalData.keyResults;
			this.toastrService.success('TOASTR.MESSAGE.KEY_RESULT_UPDATED');
			this.loadPage();
		}
	}

	createGroups(goals) {
		this.goalTimeFrames = [];
		goals.forEach((goal) => {
			if (this.goalTimeFrames.length < 1) {
				this.goalTimeFrames.push(goal.deadline);
			} else if (
				this.goalTimeFrames.findIndex(
					(element) => element === goal.deadline
				) === -1
			) {
				this.goalTimeFrames.push(goal.deadline);
			}
		});
		this.goalLevels = this.goalLevels.filter((goalLevel) =>
			goals.find((goal) => goal.level === goalLevel)
		);
		this.goalTimeFrames.sort((a, b) => a.localeCompare(b));
	}

	async addKeyResult(index, keyResult) {
		if (
			!keyResult &&
			this.goalGeneralSettings.maxKeyResults <=
				this.goals[index].keyResults.length
		) {
			this.toastrService.info(
				this.getTranslation('TOASTR.MESSAGE.MAX_KEY_RESULT_LIMIT'),
				this.getTranslation('TOASTR.TITLE.MAX_LIMIT_REACHED'),
				{ duration: 5000, preventDuplicates: true }
			);
			return;
		}
		const dialog = this.dialogService.open(EditKeyResultsComponent, {
			hasScroll: true,
			context: {
				data: keyResult,
				orgId: this.selectedOrganizationId,
				orgName: this.organizationName,
				goalDeadline: this.goals[index].deadline,
				settings: this.goalGeneralSettings
			},
			closeOnBackdropClick: false
		});
		const response = await dialog.onClose.pipe(first()).toPromise();
		if (response) {
			if (!!keyResult) {
				this.goals[index].progress = this.calculateGoalProgress(
					this.goals[index].keyResults
				);
				const goalData = this.goals[index];
				delete goalData.keyResults;
				await this.goalService.update(this.goals[index].id, goalData);
				const keyResultData = response;
				delete keyResultData.goal;
				delete keyResultData.updates;
				await this.keyResultService
					.update(keyResult.id, keyResultData)
					.then((val) => {
						if (val) {
							this.toastrService.success(
								this.getTranslation(
									'TOASTR.MESSAGE.KEY_RESULT_UPDATED'
								)
							);
							this.loadPage();
						}
					});
			} else {
				const data = {
					...response,
					goalId: this.goals[index].id
				};
				await this.keyResultService
					.createKeyResult(data)
					.then((val) => {
						if (val) {
							this.toastrService.success(
								'TOASTR.MESSAGE.KEY_RESULT_ADDED'
							);
							this.loadPage();
						}
					});
			}
		}
	}

	groupBy(group) {
		this.loading = true;
		this.objectiveGroup = group;
		if (this.popover?.isShown) {
			this.popover.hide();
		}
		this.loading = false;
	}

	calculateGoalProgress(keyResults) {
		const progressTotal = keyResults.reduce(
			(a, b) => a + b.progress * +b.weight,
			0
		);
		const weightTotal = keyResults.reduce((a, b) => a + +b.weight, 0);
		return Math.round(progressTotal / weightTotal);
	}

	filterGoals(selection, allGoals) {
		this.loading = true;
		if (this.popover?.isShown) {
			this.popover.hide();
		}
		this.selectedFilter = selection;
		if (selection !== 'all') {
			if (selection === 'employee' && !!this.employee) {
				this.goals = allGoals.filter((goal) =>
					this.employee.id == null
						? goal.level.toLowerCase() === selection
						: goal.ownerEmployee.id === this.employee.id
				);
			} else {
				this.goals = allGoals.filter(
					(goal) => goal.level.toLowerCase() === selection
				);
			}
			this.goalLevels = [GoalLevelEnum[selection.toUpperCase()]];
		} else {
			this.goals = allGoals;
			this.goalLevels = [...Object.values(GoalLevelEnum)];
			this.goalLevels = this.goalLevels.filter((goalLevel) =>
				this.goals.find((goal) => goal.level === goalLevel)
			);
		}
		this.noGoals = this.goals.length > 0 ? false : true;
		if (this.goals.length > 0) {
			this.createGroups(this.goals);
		} else {
			this.goalLevels = [];
			this.goalTimeFrames = [];
		}
		this.loading = false;
	}

	async createObjectiveFromTemplate() {
		if (this.popover?.isShown) {
			this.popover.hide();
		}
		const dialog = this.dialogService.open(GoalTemplateSelectComponent, {
			context: {
				orgId: this.selectedOrganizationId,
				orgName: this.organizationName
			}
		});
		const response = await dialog.onClose.pipe(first()).toPromise();
		if (response) {
			this.loadPage();
		}
	}

	async createObjective(goal, index) {
		if (
			!goal &&
			this.goalGeneralSettings.maxObjectives <= this.allGoals.length
		) {
			this.toastrService.info(
				this.getTranslation('TOASTR.MESSAGE.MAX_OBJECTIVE_LIMIT'),
				this.getTranslation('TOASTR.TITLE.MAX_LIMIT_REACHED'),
				{ duration: 5000, preventDuplicates: true }
			);
			return;
		}
		const dialog = this.dialogService.open(EditObjectiveComponent, {
			hasScroll: true,
			context: {
				data: goal,
				orgId: this.selectedOrganizationId,
				orgName: this.organizationName,
				settings: this.goalGeneralSettings
			},
			closeOnBackdropClick: false
		});

		const response = await dialog.onClose.pipe(first()).toPromise();
		if (response) {
			if (!!goal) {
				// Update Goal
				await this.goalService.update(goal.id, response).then((res) => {
					if (res) {
						this.toastrService.success(
							this.getTranslation(
								'TOASTR.MESSAGE.OBJECTIVE_UPDATED'
							)
						);
						this.loadPage();
					}
				});
			} else {
				// Add Goal
				const data = {
					...response,
					organizationId: this.selectedOrganizationId,
					progress: 0
				};
				try {
					await this.goalService.createGoal(data).then((val) => {
						this.toastrService.success(
							this.getTranslation(
								'TOASTR.MESSAGE.OBJECTIVE_ADDED'
							)
						);
						this.loadPage();
					});
				} catch (error) {
					this.errorHandler.handleError(error);
				}
			}
		}
	}

	async openGoalDetails(data) {
		const dialog = this.dialogService.open(GoalDetailsComponent, {
			hasScroll: true,
			context: {
				goal: data
			},
			closeOnBackdropClick: false
		});
		const response = await dialog.onClose.pipe(first()).toPromise();
		if (!!response) {
			if (response === 'deleted') {
				this.toastrService.danger(
					this.getTranslation('TOASTR.MESSAGE.OBJECTIVE_DELETED'),
					this.getTranslation('TOASTR.TITLE.SUCCESS')
				);
				this.loadPage();
			} else {
				const goalData = response;
				delete goalData.keyResults;
				await this.goalService
					.update(response.id, goalData)
					.then((res) => {
						if (res) {
							this.toastrService.success(
								this.getTranslation(
									'TOASTR.MESSAGE.OBJECTIVE_UPDATED'
								)
							);
							this.loadPage();
						}
					});
			}
		}
	}

	async openKeyResultDetails(index, selectedKeyResult) {
		const dialog = this.dialogService.open(KeyResultDetailsComponent, {
			hasScroll: true,
			context: {
				keyResult: selectedKeyResult
			},
			closeOnBackdropClick: false
		});
		const response = await dialog.onClose.pipe(first()).toPromise();
		if (!!response) {
			if (response === 'deleted') {
				this.toastrService.danger(
					this.getTranslation('TOASTR.MESSAGE.KEY_RESULT_DELETED'),
					this.getTranslation('TOASTR.TITLE.SUCCESS')
				);
				this.loadPage();
			} else {
				this.goals[index].progress = this.calculateGoalProgress(
					this.goals[index].keyResults
				);
				const goalData = this.goals[index];
				delete goalData.keyResults;
				await this.goalService.update(this.goals[index].id, goalData);
				this.toastrService.success('TOASTR.MESSAGE.KEY_RESULT_UPDATED');
				this.loadPage();
			}
		}
	}

	calculateKeyResultWeight(weight, goal) {
		const weightSum = goal.keyResults.reduce((a, b) => a + +b.weight, 0);
		return Math.round(+weight * (100 / weightSum));
	}

	async keyResultUpdate(index, selectedKeyResult: IKeyResult) {
		const keyResultDialog = this.dialogService.open(
			KeyResultUpdateComponent,
			{
				hasScroll: true,
				context: {
					keyResult: selectedKeyResult
				},
				closeOnBackdropClick: false
			}
		);
		const response = await keyResultDialog.onClose
			.pipe(first())
			.toPromise();
		if (!!response) {
			const keyResultData = response;
			delete keyResultData.goal;
			delete keyResultData.updates;
			await this.keyResultService.update(
				selectedKeyResult.id,
				keyResultData
			);
			this.goals[index].progress = this.calculateGoalProgress(
				this.goals[index].keyResults
			);
			await this.goalService.update(
				this.goals[index].id,
				this.goals[index]
			);
			this.toastrService.success('TOASTR.MESSAGE.KEY_RESULT_UPDATED');
			this.loadPage();
		}
	}

	ngOnDestroy() {}
}
