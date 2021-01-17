import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeTrackerComponent } from './time-tracker/time-tracker.component';
import { TimeTrackerService } from './time-tracker.service';
import {
	NbIconModule,
	NbButtonModule,
	NbTooltipModule,
	NbCheckboxModule,
	NbDatepickerModule
} from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared.module';
import { RouterModule } from '@angular/router';
import { TimerPickerModule } from '../timer-picker/timer-picker.module';
import { ProjectSelectModule } from '../project-select/project-select.module';
import { AngularDraggableModule } from 'angular2-draggable';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ContactSelectorModule } from '../contact-selector/contact-selector.module';
import { TaskSelectModule } from '../tasks/task-select/task-select.module';

@NgModule({
	declarations: [TimeTrackerComponent],
	imports: [
		CommonModule,
		RouterModule,
		NbIconModule,
		NbButtonModule,
		NbTooltipModule,
		FormsModule,
		TranslateModule,
		NbCheckboxModule,
		NbDatepickerModule,
		SharedModule,
		TimerPickerModule,
		TaskSelectModule,
		ProjectSelectModule,
		AngularDraggableModule,
		NgxPermissionsModule,
		ContactSelectorModule
	],
	exports: [TimeTrackerComponent]
})
export class TimeTrackerModule {
	static forRoot(): ModuleWithProviders<TimeTrackerModule> {
		return {
			ngModule: TimeTrackerModule,
			providers: [TimeTrackerService]
		};
	}
}
