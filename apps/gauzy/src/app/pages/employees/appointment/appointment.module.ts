import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import {
	NbButtonModule,
	NbCardModule,
	NbSpinnerModule,
	NbIconModule
} from '@nebular/theme';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory, ThemeModule } from '../../../@theme/theme.module';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from './appointment.component';
import { EmployeeAppointmentService } from '../../../@core/services/employee-appointment.service';
import { SharedModule } from '../../../@shared/shared.module';
import { AppointmentEmployeesService } from '../../../@core/services/appointment-employees.service';
import { AvailabilitySlotsService } from '../../../@core/services/availability-slots.service';
import { TimezoneSelectorModule } from './timezone-selector/timezone-selector.module';
import { TimeOffService } from '../../../@core/services/time-off.service';

@NgModule({
	imports: [
		FullCalendarModule,
		AppointmentRoutingModule,
		TimezoneSelectorModule,
		ThemeModule,
		NbCardModule,
		NbButtonModule,
		NbIconModule,
		NbSpinnerModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
		SharedModule
	],
	exports: [AppointmentComponent],
	declarations: [AppointmentComponent],
	providers: [
		EmployeeAppointmentService,
		AppointmentEmployeesService,
		AvailabilitySlotsService,
		TimeOffService
	]
})
export class AppointmentModule {}
