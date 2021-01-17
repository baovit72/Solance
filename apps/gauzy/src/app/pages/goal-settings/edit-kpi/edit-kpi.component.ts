import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslationBaseComponent } from '../../../@shared/language-base/translation-base.component';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { EmployeesService } from '../../../@core/services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
	IEmployee,
	KpiMetricEnum,
	KpiOperatorEnum,
	IKPI,
	KeyResultNumberUnitsEnum,
	IOrganization
} from '@gauzy/models';
import { Store } from '../../../@core/services/store.service';
import { GoalSettingsService } from '../../../@core/services/goal-settings.service';
import { ToastrService } from '../../../@core/services/toastr.service';

@Component({
	selector: 'ga-edit-kpi',
	templateUrl: './edit-kpi.component.html',
	styleUrls: ['./edit-kpi.component.scss']
})
export class EditKpiComponent
	extends TranslationBaseComponent
	implements OnInit, OnDestroy {
	kpiForm: FormGroup;
	employees: IEmployee[];
	selectedKPI: IKPI;
	type: string;
	helper = '';
	numberUnitsEnum: string[] = Object.values(KeyResultNumberUnitsEnum);
	kpiOperatorEnum = KpiOperatorEnum;
	kpiMetricEnum = KpiMetricEnum;
	private _ngDestroy$ = new Subject<void>();
	organization: IOrganization;
	constructor(
		private fb: FormBuilder,
		readonly translate: TranslateService,
		private dialogRef: NbDialogRef<EditKpiComponent>,
		private employeeService: EmployeesService,
		private store: Store,
		private goalSettingsService: GoalSettingsService,
		private readonly toastrService: ToastrService
	) {
		super(translate);
	}

	ngOnInit(): void {
		this.organization = this.store.selectedOrganization;
		this.kpiForm = this.fb.group({
			name: ['', Validators.required],
			description: [''],
			type: [KpiMetricEnum.NUMERICAL, Validators.required],
			currentValue: [0],
			targetValue: [1],
			lead: ['', Validators.required],
			operator: [
				KpiOperatorEnum.GREATER_THAN_EQUAL_TO,
				Validators.required
			],
			unit: [KeyResultNumberUnitsEnum.ITEMS]
		});
		const { id: organizationId, tenantId } = this.organization;
		this.employeeService
			.getAll(['user'], { organizationId, tenantId })
			.pipe(takeUntil(this._ngDestroy$))
			.subscribe((employees) => {
				this.employees = employees.items;
			});
		if (!!this.selectedKPI) {
			if (
				!this.numberUnitsEnum.find(
					(unit) => unit === this.selectedKPI.unit
				)
			) {
				this.numberUnitsEnum.push(this.selectedKPI.unit);
			}
			this.kpiForm.patchValue({
				...this.selectedKPI
			});
			this.kpiForm.patchValue({
				lead: !!this.selectedKPI.lead ? this.selectedKPI.lead.id : null
			});
		}
	}

	helperText(event) {
		this.helper = !!event ? event.target.id : '';
	}

	async saveKeyResult() {
		const { id: organizationId, tenantId } = this.organization;
		const kpiData = {
			...this.kpiForm.value,
			organizationId,
			tenantId
		};
		if (this.type === 'add') {
			await this.goalSettingsService.createKPI(kpiData).then((res) => {
				if (res) {
					this.toastrService.success('TOASTR.MESSAGE.KPI_CREATED');
					this.closeDialog(res);
				}
			});
		} else {
			await this.goalSettingsService
				.updateKPI(this.selectedKPI.id, kpiData)
				.then((res) => {
					if (res) {
						this.toastrService.success(
							'TOASTR.MESSAGE.KPI_UPDATED'
						);
						this.closeDialog(res);
					}
				});
		}
	}

	selectEmployee(event, control) {
		if (control === 'lead') {
			this.kpiForm.patchValue({ lead: event });
		} else {
			this.kpiForm.patchValue({ owner: event });
		}
	}

	closeDialog(data) {
		this.dialogRef.close(data);
	}

	ngOnDestroy() {
		this._ngDestroy$.next();
		this._ngDestroy$.complete();
	}
}
