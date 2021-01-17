import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeStore } from 'apps/gauzy/src/app/@core/services/employee-store.service';
import { Subject } from 'rxjs';
import { IEmployee } from '@gauzy/models';
import { takeUntil } from 'rxjs/operators';
import { ValidationService } from 'apps/gauzy/src/app/@core/services/validation.service';

@Component({
	selector: 'ga-edit-employee-hiring',
	templateUrl: './edit-employee-hiring.component.html',
	styleUrls: [
		'../../../../organizations/edit-organization/edit-organization-settings/edit-organization-main/edit-organization-main.component.scss'
	]
})
export class EditEmployeeHiringComponent implements OnInit, OnDestroy {
	private _ngDestroy$ = new Subject<void>();
	form: FormGroup;
	selectedEmployee: IEmployee;

	constructor(
		private fb: FormBuilder,
		private employeeStore: EmployeeStore,
		private validationService: ValidationService
	) {}

	ngOnInit() {
		this.employeeStore.selectedEmployee$
			.pipe(takeUntil(this._ngDestroy$))
			.subscribe((emp) => {
				this.selectedEmployee = emp;
				if (this.selectedEmployee) {
					this._initializeForm(this.selectedEmployee);
				}
			});
	}

	async submitForm() {
		if (this.form.valid) {
			this.employeeStore.employeeForm = {
				...this.form.value
			};
		}
	}

	private _initializeForm(employee: IEmployee) {
		this.form = this.fb.group(
			{
				offerDate: [employee.offerDate],
				acceptDate: [employee.acceptDate],
				rejectDate: [employee.rejectDate]
			},
			{
				validator: this.validationService.validateDate
			}
		);
	}

	ngOnDestroy() {
		this._ngDestroy$.next();
	}
}
