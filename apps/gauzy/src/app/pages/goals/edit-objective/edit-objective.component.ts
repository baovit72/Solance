import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
	IEmployee,
	IGoal,
	IGoalTimeFrame,
	GoalLevelEnum,
	TimeFrameStatusEnum,
	RolesEnum,
	IOrganizationTeam,
	IGoalGeneralSetting,
	GoalOwnershipEnum,
	IOrganization
} from '@gauzy/models';
import { EmployeesService } from '../../../@core/services';
import { takeUntil, first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GoalSettingsService } from '../../../@core/services/goal-settings.service';
import { EditTimeFrameComponent } from '../../goal-settings/edit-time-frame/edit-time-frame.component';
import { Store } from '../../../@core/services/store.service';
import { OrganizationTeamsService } from '../../../@core/services/organization-teams.service';
import { isFuture } from 'date-fns';

@Component({
	selector: 'ga-edit-objective',
	templateUrl: './edit-objective.component.html',
	styleUrls: ['./edit-objective.component.scss']
})
export class EditObjectiveComponent implements OnInit, OnDestroy {
	objectiveForm: FormGroup;
	employees: IEmployee[];
	data: IGoal;
	timeFrames: IGoalTimeFrame[] = [];
	orgId: string;
	orgName: string;
	goalLevelEnum = GoalLevelEnum;
	hideEmployee = false;
	hideTeam = false;
	hideOrg = false;
	helperText = '';
	settings: IGoalGeneralSetting;
	teams: IOrganizationTeam[] = [];
	timeFrameStatusEnum = TimeFrameStatusEnum;
	private _ngDestroy$ = new Subject<void>();
	organization: IOrganization;
	constructor(
		private dialogRef: NbDialogRef<EditObjectiveComponent>,
		private fb: FormBuilder,
		private employeeService: EmployeesService,
		private goalSettingService: GoalSettingsService,
		private dialogService: NbDialogService,
		private store: Store,
		private organizationTeamsService: OrganizationTeamsService
	) {}

	async ngOnInit() {
		this.organization = this.store.selectedOrganization;
		this.objectiveForm = this.fb.group({
			name: ['', Validators.required],
			description: [''],
			owner: [null, Validators.required],
			lead: [null],
			level: [GoalLevelEnum.ORGANIZATION, Validators.required],
			deadline: ['', Validators.required]
		});
		if (!!this.data) {
			this.objectiveForm.patchValue(this.data);
			this.objectiveForm.patchValue({
				lead: !!this.data.lead ? this.data.lead.id : null,
				owner: !!this.data.ownerEmployee
					? this.data.ownerEmployee.id
					: !!this.data.ownerTeam
					? this.data.ownerTeam.id
					: this.data.organization.id
			});
			if (this.data.level === GoalLevelEnum.TEAM) {
				this.getTeams();
			}
		}
		this.getTimeFrames();
		const { id: organizationId, tenantId } = this.organization;
		this.employeeService
			.getAll(['user'], { organizationId, tenantId })
			.pipe(takeUntil(this._ngDestroy$))
			.subscribe((employees) => {
				this.employees = employees.items;
			});

		this.objectiveForm.controls['level'].updateValueAndValidity();
		if (
			this.store.user.role.name !== RolesEnum.SUPER_ADMIN &&
			this.store.user.role.name !== RolesEnum.MANAGER &&
			this.store.user.role.name !== RolesEnum.ADMIN
		) {
			this.hideOrg = true;
		}
		this.hideEmployee =
			this.settings.canOwnObjectives === GoalOwnershipEnum.TEAMS;
		this.hideTeam =
			this.settings.canOwnObjectives === GoalOwnershipEnum.EMPLOYEES;
	}

	async getTeams() {
		const { id: organizationId, tenantId } = this.organization;
		await this.organizationTeamsService
			.getAll(['members'], { organizationId, tenantId })
			.then((res) => {
				const { items } = res;
				this.teams = items;
			});
	}

	async getTimeFrames() {
		const { id: organizationId, tenantId } = this.organization;
		const findObj = {
			organization: {
				id: organizationId
			},
			tenantId
		};
		await this.goalSettingService.getAllTimeFrames(findObj).then((res) => {
			if (res) {
				this.timeFrames = res.items.filter(
					(timeframe) =>
						timeframe.status === this.timeFrameStatusEnum.ACTIVE &&
						isFuture(new Date(timeframe.endDate))
				);
				if (!!this.data) {
					this.timeFrames.push(
						res.items.find(
							(timeFrame) => this.data.deadline === timeFrame.name
						)
					);
				}
			}
		});
	}

	async openSetTimeFrame() {
		const dialog = this.dialogService.open(EditTimeFrameComponent, {
			context: {
				type: 'add'
			},
			closeOnBackdropClick: false
		});
		const response = await dialog.onClose.pipe(first()).toPromise();
		if (response) {
			await this.getTimeFrames();
		}
	}

	saveObjective() {
		const { id: organizationId, tenantId } = this.organization;
		const objectiveData = {
			...{ organizationId, tenantId },
			...this.objectiveForm.value
		};
		objectiveData[
			this.objectiveForm.value.level === GoalLevelEnum.EMPLOYEE
				? 'ownerEmployee'
				: this.objectiveForm.value.level === GoalLevelEnum.TEAM
				? 'ownerTeam'
				: 'organization'
		] = this.objectiveForm.value.owner;
		delete objectiveData.owner;
		delete objectiveData.organization;
		this.closeDialog(objectiveData);
	}

	closeDialog(data = null) {
		this.dialogRef.close(data);
	}

	ngOnDestroy() {
		this._ngDestroy$.next();
		this._ngDestroy$.complete();
	}
}
