import { Component, OnDestroy, OnInit } from '@angular/core';
import {
	IEditEntityByMemberInput,
	IEmployee,
	IOrganization,
	IOrganizationProject
} from '@gauzy/models';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeStore } from 'apps/gauzy/src/app/@core/services/employee-store.service';
import { OrganizationProjectsService } from 'apps/gauzy/src/app/@core/services/organization-projects.service';
import { TranslationBaseComponent } from 'apps/gauzy/src/app/@shared/language-base/translation-base.component';
import { Store } from 'apps/gauzy/src/app/@core/services/store.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'apps/gauzy/src/app/@core/services/toastr.service';

@Component({
	selector: 'ga-edit-employee-departments',
	templateUrl: './edit-employee-projects.component.html'
})
export class EditEmployeeProjectsComponent
	extends TranslationBaseComponent
	implements OnInit, OnDestroy {
	organizationProjects: IOrganizationProject[] = [];
	employeeProjects: IOrganizationProject[] = [];

	selectedEmployee: IEmployee;
	organization: IOrganization;
	private _ngDestroy$ = new Subject<void>();

	constructor(
		private readonly organizationProjectsService: OrganizationProjectsService,
		private readonly toastrService: ToastrService,
		private readonly employeeStore: EmployeeStore,
		readonly translateService: TranslateService,
		private readonly store: Store
	) {
		super(translateService);
	}

	ngOnInit() {
		this.store.selectedOrganization$
			.pipe(takeUntil(this._ngDestroy$))
			.subscribe((organization) => {
				this.organization = organization;
			});

		this.employeeStore.selectedEmployee$
			.pipe(takeUntil(this._ngDestroy$))
			.subscribe((emp) => {
				this.selectedEmployee = emp;
				if (this.selectedEmployee) {
					this.loadProjects();
				}
			});
	}

	ngOnDestroy(): void {
		this._ngDestroy$.next();
		this._ngDestroy$.complete();
	}

	async submitForm(formInput: IEditEntityByMemberInput, removed: boolean) {
		try {
			if (formInput.member) {
				await this.organizationProjectsService.updateByEmployee(
					formInput
				);
				this.loadProjects();
				this.toastrService.success(
					removed
						? 'TOASTR.MESSAGE.EMPLOYEE_PROJECT_REMOVED'
						: 'TOASTR.MESSAGE.EMPLOYEE_PROJECT_ADDED'
				);
			}
		} catch (error) {
			this.toastrService.danger('TOASTR.MESSAGE.EMPLOYEE_EDIT_ERROR');
		}
	}

	private async loadProjects() {
		await this.loadSelectedEmployeeProjects();
		const orgProjects = await this.getOrganizationProjects();
		const selectedProjectIds = this.employeeProjects.map((d) => d.id);
		if (orgProjects) {
			this.organizationProjects = orgProjects.filter(
				(project) => selectedProjectIds.indexOf(project.id) < 0
			);
		}
	}

	private async loadSelectedEmployeeProjects() {
		if (!this.organization) {
			return;
		}
		const { tenantId } = this.store.user;
		const { id: organizationId } = this.organization;
		this.employeeProjects = await this.organizationProjectsService.getAllByEmployee(
			this.selectedEmployee.id,
			{ organizationId, tenantId }
		);
	}

	private async getOrganizationProjects() {
		if (!this.organization) {
			return;
		}
		const { tenantId } = this.store.user;
		const { id: organizationId } = this.organization;
		const { items = [] } = await this.organizationProjectsService.getAll(
			[],
			{
				organizationId,
				tenantId
			}
		);
		return items;
	}
}
