import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import {
	IEmployee,
	IEmployeeUpdateInput,
	IUserUpdateInput
} from '@gauzy/models';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeStore } from '../../../../@core/services/employee-store.service';
import { EmployeesService } from '../../../../@core/services/employees.service';
import { ErrorHandlingService } from '../../../../@core/services/error-handling.service';
import { UsersService } from '../../../../@core/services/users.service';
import { TranslationBaseComponent } from '../../../../@shared/language-base/translation-base.component';
import { Subject, Subscription } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { ToastrService } from '../../../../@core/services/toastr.service';

@Component({
	selector: 'ngx-edit-employee-profile',
	templateUrl: './edit-employee-profile.component.html',
	styleUrls: [
		'../../../../@shared/user/edit-profile-form/edit-profile-form.component.scss'
	],
	providers: [EmployeeStore]
})
export class EditEmployeeProfileComponent
	extends TranslationBaseComponent
	implements OnInit, OnDestroy {
	private _ngDestroy$ = new Subject<void>();
	form: FormGroup;
	paramSubscription: Subscription;
	hoverState: boolean;
	fakeDepartments: { departmentName: string; departmentId: string }[] = [];
	fakePositions: { positionName: string; positionId: string }[] = [];
	routeParams: Params;
	selectedEmployee: IEmployee;
	employeeName = 'Employee';

	tabs: any[];

	constructor(
		private route: ActivatedRoute,
		private employeeService: EmployeesService,
		private userService: UsersService,
		private toastrService: ToastrService,
		private employeeStore: EmployeeStore,
		private errorHandler: ErrorHandlingService,
		readonly translateService: TranslateService
	) {
		super(translateService);
	}

	ngOnInit() {
		this.route.params
			.pipe(takeUntil(this._ngDestroy$))
			.subscribe((params) => {
				this.routeParams = params;
				this._loadEmployeeData();
				this.loadTabs();
			});

		this.employeeStore.userForm$
			.pipe(takeUntil(this._ngDestroy$))
			.subscribe((value) => {
				this.submitUserForm(value);
			});

		this.employeeStore.employeeForm$
			.pipe(takeUntil(this._ngDestroy$))
			.subscribe((value) => {
				this.submitEmployeeForm(value);
			});

		this._applyTranslationOnTabs();
	}

	getRoute(tab: string): string {
		return `/pages/employees/edit/${this.routeParams.id}/${tab}`;
	}

	loadTabs() {
		this.tabs = [
			{
				title: this.getTranslation(
					'EMPLOYEES_PAGE.EDIT_EMPLOYEE.ACCOUNT'
				),
				icon: 'person-outline',
				responsive: true,
				route: this.getRoute('account')
			},
			{
				title: this.getTranslation(
					'EMPLOYEES_PAGE.EDIT_EMPLOYEE.PROJECTS'
				),
				icon: 'book-outline',
				responsive: true,
				route: this.getRoute('projects')
			}
		];
	}
	private async submitEmployeeForm(value: IEmployeeUpdateInput) {
		if (value) {
			try {
				await this.employeeService.update(
					this.selectedEmployee.id,
					value
				);

				this.toastrService.success(
					'TOASTR.MESSAGE.EMPLOYEE_PROFILE_UPDATE',
					{ name: this.employeeName }
				);
				this._loadEmployeeData();
			} catch (error) {
				this.errorHandler.handleError(error);
			}
		}
	}

	/**
	 * This is to update the User details of an Employee.
	 * Do NOT use this function to update any details which are NOT stored in the User Entity.
	 */
	private async submitUserForm(value: IUserUpdateInput) {
		if (value) {
			try {
				await this.userService.update(
					this.selectedEmployee.user.id,
					value
				);

				this.toastrService.success(
					'TOASTR.MESSAGE.EMPLOYEE_PROFILE_UPDATE',
					{ name: this.employeeName }
				);

				this._loadEmployeeData();
			} catch (error) {
				this.errorHandler.handleError(error);
			}
		}
	}

	private async _loadEmployeeData() {
		const { id } = this.routeParams;
		const { items } = await this.employeeService
			.getAll(
				[
					'user',
					'organizationDepartments',
					'organizationPosition',
					'organizationEmploymentTypes',
					'tags',
					'skills',
					'contact'
				],
				{ id }
			)
			.pipe(first())
			.toPromise();

		this.selectedEmployee = items[0];
		const checkUsername = this.selectedEmployee.user.username;
		this.employeeName = checkUsername ? checkUsername : 'Employee';

		this.employeeStore.selectedEmployee = this.selectedEmployee;
	}

	ngOnDestroy() {
		this._ngDestroy$.next();
		this._ngDestroy$.complete();
	}

	private _applyTranslationOnTabs() {
		this.translateService.onLangChange
			.pipe(takeUntil(this._ngDestroy$))
			.subscribe(() => {
				this.loadTabs();
			});
	}
}
