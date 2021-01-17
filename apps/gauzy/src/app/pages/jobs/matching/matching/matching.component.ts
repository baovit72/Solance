import { Component, OnInit } from '@angular/core';
import {
	IEmployeePresetInput,
	IGetJobPresetInput,
	IOrganization,
	JobPostSourceEnum,
	IJobPreset,
	IJobPresetUpworkJobSearchCriterion,
	IJobSearchCategory,
	IJobSearchOccupation,
	IMatchingCriterions,
	JobPostTypeEnum
} from '@gauzy/models';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { JobPresetService } from 'apps/gauzy/src/app/@core/services/job-preset.service';
import { JobSearchCategoryService } from 'apps/gauzy/src/app/@core/services/job-search-category.service';
import { JobSearchOccupationService } from 'apps/gauzy/src/app/@core/services/job-search-occupation.service';
import { Store } from 'apps/gauzy/src/app/@core/services/store.service';
import { ToastrService } from 'apps/gauzy/src/app/@core/services/toastr.service';
import { debounceTime, filter, tap } from 'rxjs/operators';
import * as _ from 'underscore';

@UntilDestroy()
@Component({
	selector: 'ga-matching',
	templateUrl: './matching.component.html',
	styleUrls: ['./matching.component.scss']
})
export class MatchingComponent implements OnInit {
	jobPresets: IJobPreset[];
	criterionForm = {
		jobSource: JobPostSourceEnum.UPWORK,
		jobPresetId: null
	};
	JobPostSourceEnum = JobPostSourceEnum;
	JobPostTypeEnum = JobPostTypeEnum;
	categories: IJobSearchCategory[] = [];
	occupations: IJobSearchOccupation[] = [];
	criterions: IMatchingCriterions[] = [];
	selectedEmployeeId: string;
	selectedOrganization: IOrganization;
	hasAnyChanges = false;
	tenantId: string;

	constructor(
		private jobPresetService: JobPresetService,
		private jobSearchOccupationService: JobSearchOccupationService,
		private jobSearchCategoryService: JobSearchCategoryService,
		private toastrService: ToastrService,
		private store: Store
	) {
		this.addPreset = this.addPreset.bind(this);
		this.createNewCategories = this.createNewCategories.bind(this);
		this.createNewOccupations = this.createNewOccupations.bind(this);
	}

	ngOnInit(): void {
		this.store.user$
			.pipe(
				filter((user) => !!user),
				tap((user) => (this.tenantId = user.tenantId))
			)
			.subscribe();
		this.store.selectedOrganization$
			.pipe(
				filter((organization) => !!organization),
				untilDestroyed(this),
				debounceTime(500)
			)
			.subscribe((organization) => {
				setTimeout(async () => {
					this.selectedOrganization = organization;
					if (this.selectedOrganization) {
						this.getJobPresets();
						this.getCategories();
						this.getOccupations();
					}
				});
			});
		this.store.selectedEmployee$
			.pipe(
				filter((employee) => !!employee),
				untilDestroyed(this),
				debounceTime(500)
			)
			.subscribe((employee) => {
				setTimeout(async () => {
					this.criterions = [];
					this.criterionForm = {
						jobSource: JobPostSourceEnum.UPWORK,
						jobPresetId: null
					};
					if (employee && employee.id) {
						this.selectedEmployeeId = employee.id;
						this.jobPresetService
							.getJobPresets({ employeeId: employee.id })
							.then((jobPresets) => {
								this.criterionForm.jobPresetId =
									jobPresets.length > 0
										? jobPresets[0].id
										: null;
							});
						await this.getEmployeeCriterions();
					} else {
						this.selectedEmployeeId = null;
						this.criterions = [];
					}
					this.checkForEmptyCriterion();
				});
			});
	}

	getJobPresets() {
		const { tenantId } = this;
		const request: IGetJobPresetInput = {
			organizationId: this.selectedOrganization.id,
			tenantId
		};
		this.jobPresetService.getJobPresets(request).then((jobPresets) => {
			this.jobPresets = jobPresets;
		});
	}

	getEmployeeCriterions() {
		return this.jobPresetService
			.getEmployeeCriterions(this.selectedEmployeeId)
			.then((criterions) => {
				this.criterions = criterions;
			});
	}

	addPreset(name?: string) {
		const request: IJobPreset = {
			organizationId: this.selectedOrganization.id,
			name
		};
		if (this.selectedEmployeeId) {
			request.employees = [{ id: this.selectedEmployeeId }];
		}
		this.jobPresetService.createJobPreset(request).then((jobPreset) => {
			this.jobPresets = this.jobPresets.concat([jobPreset]);
			this.criterionForm.jobPresetId = jobPreset.id;

			this.checkForEmptyCriterion();
		});
	}

	async onPresetSelected(jobPreset: IJobPreset) {
		if (jobPreset) {
			if (this.selectedEmployeeId) {
				await this.updateEmployeePreset();
			} else {
				await this.jobPresetService
					.getJobPreset(jobPreset.id)
					.then(({ jobPresetCriterions }) => {
						this.criterions = jobPresetCriterions;
					});
			}
		} else {
			this.criterions = [];
		}
		this.hasAnyChanges = false;
		this.checkForEmptyCriterion();
	}

	onSourceSelected() {
		this.criterionForm.jobPresetId = null;
		this.updateEmployeePreset();
		this.checkForEmptyCriterion();
	}

	async updateEmployeePreset() {
		this.criterions = [];
		if (this.selectedEmployeeId) {
			const request: IEmployeePresetInput = {
				source: this.criterionForm.jobSource,
				jobPresetIds: [this.criterionForm.jobPresetId],
				employeeId: this.selectedEmployeeId
			};
			await this.jobPresetService
				.saveEmployeePreset(request)
				.then((criterions) => {
					this.criterions = criterions;
				});
		}
	}

	async checkForEmptyCriterion() {
		if (
			(this.selectedEmployeeId || this.criterionForm.jobPresetId) &&
			this.criterions.length === 0
		) {
			this.addNewCriterion();
		}
	}

	saveJobPreset() {
		if (this.criterionForm.jobPresetId) {
			const request: IJobPreset = {
				id: this.criterionForm.jobPresetId
			};
			if (this.criterions && this.criterions.length > 0) {
				request.jobPresetCriterions = this.criterions.map(
					(employeeCriterion): IJobPresetUpworkJobSearchCriterion => {
						return _.omit(
							employeeCriterion,
							'employeeId',
							'id',
							'jobPresetId'
						);
					}
				);
				request.jobPresetCriterions = request.jobPresetCriterions.filter(
					(employeeCriterion) => {
						const values = Object.values(employeeCriterion);
						return values.length > 0;
					}
				);
			}
			this.jobPresetService.createJobPreset(request).then(() => {
				this.hasAnyChanges = false;
				this.toastrService.success('TOASTR.MESSAGE.PRESET_SAVED');
			});
		}
	}

	saveCriterion(criterion?: IMatchingCriterions) {
		let req: any;
		this.hasAnyChanges = true;
		if (this.selectedEmployeeId) {
			req = this.jobPresetService.createEmployeeCriterion(
				this.selectedEmployeeId,
				criterion
			);
		} else {
			req = this.jobPresetService.createJobPresetCriterion(
				this.criterionForm.jobPresetId,
				criterion
			);
		}

		req.then((newCreation) => {
			const index = this.criterions.indexOf(criterion);
			this.criterions[index] = newCreation;
			this.toastrService.success('TOASTR.MESSAGE.JOB_MATCHING_SAVED');
		}).catch(() => {
			this.toastrService.error('TOASTR.MESSAGE.JOB_MATCHING_ERROR');
		});
	}

	async deleteCriterions(index, criterion: IMatchingCriterions) {
		if (criterion.id) {
			this.hasAnyChanges = true;
			if (this.selectedEmployeeId) {
				try {
					await this.jobPresetService.deleteEmployeeCriterion(
						this.selectedEmployeeId,
						criterion.id
					);
					this.toastrService.success(
						'TOASTR.MESSAGE.JOB_MATCHING_DELETED'
					);
				} catch (error) {
					this.toastrService.error(
						'TOASTR.MESSAGE.JOB_MATCHING_ERROR'
					);
					return;
				}
			} else {
				try {
					await this.jobPresetService.deleteJobPresetCriterion(
						criterion.id
					);
					this.toastrService.success(
						'TOASTR.MESSAGE.JOB_MATCHING_DELETED'
					);
				} catch (error) {
					this.toastrService.error(
						'TOASTR.MESSAGE.JOB_MATCHING_ERROR'
					);
					return;
				}
			}
		}

		this.criterions.splice(index, 1);
		if (this.criterions.length === 0) {
			this.addNewCriterion();
		}
	}

	addNewCriterion(criterion: IMatchingCriterions = {}) {
		this.criterions.push(criterion);
	}

	getCategories() {
		this.jobSearchCategoryService
			.getAll({
				jobSource: this.criterionForm.jobSource
			})
			.then((categories) => {
				this.categories = categories.items;
			});
	}

	getOccupations() {
		this.jobSearchOccupationService
			.getAll({
				jobSource: this.criterionForm.jobSource
			})
			.then((occupations) => {
				this.occupations = occupations.items;
			});
	}

	createNewCategories(title) {
		this.jobSearchCategoryService
			.create({
				name: title,
				organizationId: this.selectedOrganization.id,
				jobSource: this.criterionForm.jobSource
			})
			.then((category) => {
				this.categories = this.categories.concat([category]);
				console.log(this.categories);
			});
	}

	createNewOccupations(title) {
		this.jobSearchOccupationService
			.create({
				name: title,
				organizationId: this.selectedOrganization.id,
				jobSource: this.criterionForm.jobSource
			})
			.then((occupation) => {
				this.occupations = this.occupations.concat([occupation]);
			});
	}
}
