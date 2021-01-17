import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	NbAlertModule,
	NbButtonModule,
	NbCardModule,
	NbCheckboxModule,
	NbDatepickerModule,
	NbIconModule,
	NbInputModule,
	NbSelectModule,
	NbSpinnerModule,
	NbTooltipModule
} from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { OrganizationsService } from '../../../@core/services/organizations.service';
import { HttpLoaderFactory, ThemeModule } from '../../../@theme/theme.module';
import { RecurringExpenseMutationComponent } from './recurring-expense-mutation.component';
import { EmployeeSelectorsModule } from '../../../@theme/components/header/selectors/employee/employee.module';
import { CurrencyModule } from '../../currency/currency.module';

@NgModule({
	imports: [
		ThemeModule,
		FormsModule,
		ReactiveFormsModule,
		NbCardModule,
		NbButtonModule,
		NbIconModule,
		NbInputModule,
		NbDatepickerModule,
		NgSelectModule,
		NbSelectModule,
		NbTooltipModule,
		NbCheckboxModule,
		NbAlertModule,
		NbSpinnerModule,
		EmployeeSelectorsModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
		CurrencyModule
	],
	exports: [RecurringExpenseMutationComponent],
	declarations: [RecurringExpenseMutationComponent],
	entryComponents: [RecurringExpenseMutationComponent],
	providers: [OrganizationsService]
})
export class RecurringExpenseMutationModule {}
