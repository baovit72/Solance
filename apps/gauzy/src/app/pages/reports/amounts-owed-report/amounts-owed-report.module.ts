import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmountsOwedReportRoutingModule } from './amounts-owed-report-routing.module';
import { AmountsOwedReportComponent } from './amounts-owed-report/amounts-owed-report.component';
import { FormsModule } from '@angular/forms';
import {
	NbIconModule,
	NbSpinnerModule,
	NbCardModule,
	NbSelectModule
} from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AmountsOwedGridModule } from '../../../@shared/report/amounts-owed-grid/amounts-owed-grid.module';
import { FiltersModule } from '../../../@shared/timesheet/filters/filters.module';
import { LineChartModule } from '../../../@shared/report/charts/line-chart/line-chart.module';

@NgModule({
	declarations: [AmountsOwedReportComponent],
	imports: [
		CommonModule,
		AmountsOwedReportRoutingModule,

		TranslateModule,
		NbIconModule,
		NbSpinnerModule,
		NbCardModule,
		FiltersModule,
		NbSelectModule,
		FormsModule,
		AmountsOwedGridModule,
		LineChartModule
	]
})
export class AmountsOwedReportModule {}
