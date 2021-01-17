import { EmployeeMultiSelectModule } from './../../../@shared/employee/employee-multi-select/employee-multi-select.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ThemeModule, HttpLoaderFactory } from '../../../@theme/theme.module';
import {
	NbCardModule,
	NbIconModule,
	NbButtonModule,
	NbSelectModule,
	NbInputModule,
	NbToggleModule
} from '@nebular/theme';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AddArticleComponent } from './add-article.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { HelpCenterArticleService } from '../../../@core/services/help-center-article.service';

@NgModule({
	imports: [
		CKEditorModule,
		ThemeModule,
		NbCardModule,
		NbIconModule,
		NbInputModule,
		NbButtonModule,
		NbSelectModule,
		NbToggleModule,
		FormsModule,
		ReactiveFormsModule,
		EmployeeMultiSelectModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	providers: [HelpCenterArticleService],
	entryComponents: [AddArticleComponent],
	declarations: [AddArticleComponent],
	exports: [AddArticleComponent]
})
export class AddArticleModule {}
