import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalSettingsRoutingModule } from './goal-settings-routing.module';
import { GoalSettingsComponent } from './goal-settings.component';
import {
	NbCardModule,
	NbIconModule,
	NbButtonModule,
	NbSelectModule,
	NbDatepickerModule,
	NbInputModule,
	NbDialogModule,
	NbListModule,
	NbTabsetModule,
	NbCheckboxModule,
	NbToggleModule,
	NbFormFieldModule,
	NbSpinnerModule
} from '@nebular/theme';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { EditTimeFrameComponent } from './edit-time-frame/edit-time-frame.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../@shared/shared.module';
import { EditKpiComponent } from './edit-kpi/edit-kpi.component';
import { EmployeeMultiSelectModule } from '../../@shared/employee/employee-multi-select/employee-multi-select.module';
import { HttpLoaderFactory, ThemeModule } from '../../@theme/theme.module';
import { CardGridModule } from '../../@shared/card-grid/card-grid.module';
import { GoalCustomUnitModule } from '../../@shared/goal/goal-custom-unit/goal-custom-unit.module';
import { GoalTemplatesModule } from '../../@shared/goal/goal-templates/goal-templates.module';

@NgModule({
	declarations: [
		GoalSettingsComponent,
		EditTimeFrameComponent,
		EditKpiComponent
	],
	imports: [
		CommonModule,
		NbCardModule,
		NbIconModule,
		ReactiveFormsModule,
		Ng2SmartTableModule,
		NbButtonModule,
		NbSelectModule,
		NbDatepickerModule,
		NbInputModule,
		NbDatepickerModule,
		GoalSettingsRoutingModule,
		NbListModule,
		EmployeeMultiSelectModule,
		SharedModule,
		NbTabsetModule,
		ThemeModule,
		CardGridModule,
		NbCheckboxModule,
		NbToggleModule,
		GoalCustomUnitModule,
		GoalTemplatesModule,
		NbFormFieldModule,
		NbSpinnerModule,
		NbDialogModule.forChild(),
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	]
})
export class GoalSettingsModule {}
