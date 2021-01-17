import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { KeyResultTypeEnum, KeyResultNumberUnitsEnum } from '@gauzy/models';
import { Store } from '../../../@core/services/store.service';
import { environment as ENV } from 'apps/gauzy/src/environments/environment';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'ga-goal-custom-unit-select',
	templateUrl: './goal-custom-unit-select.component.html',
	styleUrls: ['./goal-custom-unit-select.component.scss']
})
export class GoalCustomUnitSelectComponent implements OnInit, OnDestroy {
	@Input() parentFormGroup: FormGroup;
	@Input() numberUnits: string[];
	keyResultTypeEnum = KeyResultTypeEnum;
	createNew = false;
	defaultCurrency: string;

	constructor(private readonly store: Store) {}

	ngOnInit() {
		this.defaultCurrency = this.store.selectedOrganization.currency;
		this.parentFormGroup.controls['type'].valueChanges
			.pipe(untilDestroyed(this))
			.subscribe((formValue) => {
				if (formValue === KeyResultTypeEnum.CURRENCY) {
					this.parentFormGroup.controls['unit'].patchValue(
						this.defaultCurrency || ENV.DEFAULT_CURRENCY
					);
				} else if (formValue === KeyResultTypeEnum.NUMERICAL) {
					this.parentFormGroup.controls['unit'].patchValue(
						KeyResultNumberUnitsEnum.ITEMS
					);
				}
			});
	}

	createNewUnit() {
		if (this.parentFormGroup.value.unit !== ' ') {
			this.numberUnits.push(this.parentFormGroup.value.unit);
		}
		this.createNew = false;
	}

	ngOnDestroy() {}
}
