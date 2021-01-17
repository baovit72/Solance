import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyresultTypeSelectComponent } from './keyresult-type-select.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { NbSelectModule, NbInputModule, NbDialogModule } from '@nebular/theme';
import { ProjectSelectModule } from '../../project-select/project-select.module';
import { TaskSelectModule } from '../../tasks/task-select/task-select.module';
import { GoalCustomUnitModule } from '../goal-custom-unit/goal-custom-unit.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpLoaderFactory } from '../../../@theme/theme.module';
@NgModule({
	declarations: [KeyresultTypeSelectComponent],
	imports: [
		CommonModule,
		NbSelectModule,
		NbInputModule,
		ProjectSelectModule,
		TaskSelectModule,
		GoalCustomUnitModule,
		ReactiveFormsModule,
		NbDialogModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	exports: [KeyresultTypeSelectComponent],
	entryComponents: [KeyresultTypeSelectComponent]
})
export class KeyresultTypeSelectModule {}
