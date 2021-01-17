import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {
	IEmployee,
	IOrganization,
	IOrganizationTeam,
	ITimeOffPolicyVM
} from '@gauzy/models';
import { EmployeesService } from '../../../@core/services';
import { first, takeUntil } from 'rxjs/operators';
import { Store } from '../../../@core/services/store.service';
import { Subject } from 'rxjs';

@Component({
	selector: 'ngx-time-off-settings-mutation',
	templateUrl: './time-off-settings-mutation.component.html',
	styleUrls: ['../time-off-mutation.components.scss']
})
export class TimeOffSettingsMutationComponent implements OnInit, OnDestroy {
	constructor(
		protected dialogRef: NbDialogRef<TimeOffSettingsMutationComponent>,
		private employeesService: EmployeesService,
		private store: Store
	) {}

	private _ngDestroy$ = new Subject<void>();

	@Input()
	team?: IOrganizationTeam;

	policy: ITimeOffPolicyVM;
	organizationId: string;
	selectedEmployees: string[] = [];
	employees: IEmployee[] = [];
	name: string;
	requiresApproval: boolean;
	paid: boolean;
	showWarning = false;
	organization: IOrganization;

	ngOnInit() {
		this.store.selectedOrganization$
			.pipe(takeUntil(this._ngDestroy$))
			.subscribe((org) => {
				this.organization = org;
				this.organizationId = org.id;
			});

		this.loadEmployees();
		this._initializeForm();
	}

	private async loadEmployees() {
		if (!this.organizationId) {
			return;
		}
		const { items } = await this.employeesService
			.getAll(['user'], {
				organization: { id: this.organizationId },
				tenantId: this.organization.tenantId
			})
			.pipe(first())
			.toPromise();

		this.employees = items;

		if (this.policy) {
			this.policy.employees.forEach((employee) => {
				this.selectedEmployees.push(employee.id);
			});
		}
	}

	private _initializeForm() {
		if (this.policy) {
			this.name = this.policy.name;
			this.paid = this.policy.paid;
			this.requiresApproval = this.policy.requiresApproval;
		} else {
			this.name = '';
			this.paid = true;
			this.requiresApproval = false;
		}
	}

	addOrEditPolicy() {
		if (this.name && this.selectedEmployees) {
			this.dialogRef.close({
				name: this.name,
				organizationId: this.organizationId,
				tenantId: this.organization.tenantId,
				employees: this.selectedEmployees,
				requiresApproval: this.requiresApproval,
				paid: this.paid
			});
		} else {
			this.showWarning = true;
			setTimeout(() => {
				this.closeWarning();
			}, 3000);
		}
	}

	onEmployeesSelected(employees: string[]) {
		this.selectedEmployees = employees;
	}

	changeRequiresApproval(checked: boolean) {
		this.requiresApproval = checked;
	}

	changePaidStatus(checked: boolean) {
		this.paid = checked;
	}

	closeWarning() {
		this.showWarning = !this.showWarning;
	}

	close() {
		this.dialogRef.close();
	}

	ngOnDestroy() {
		this._ngDestroy$.next();
		this._ngDestroy$.complete();
		clearTimeout();
	}
}
