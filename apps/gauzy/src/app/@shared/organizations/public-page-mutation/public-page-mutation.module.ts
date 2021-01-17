import { HttpLoaderFactory, ThemeModule } from '../../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {
	NbCardModule,
	NbListModule,
	NbActionsModule,
	NbButtonModule,
	NbIconModule,
	NbDatepickerModule,
	NbInputModule,
	NbSelectModule,
	NbCheckboxModule,
	NbTooltipModule,
	NbBadgeModule,
	NbToggleModule,
	NbTabsetModule
} from '@nebular/theme';
import { PublicPageMutationComponent } from './public-page-mutation.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { SkillsInputModule } from '../../skills/skills-input/skills-input.module';
import { LanguageInputModule } from '../../language/language-input/language-input.module';
import { SkillsService } from '../../../@core/services/skills.service';
import { LanguagesService } from '../../../@core/services/languages.service';
import { CKEditorModule } from 'ng2-ckeditor';
@NgModule({
	imports: [
		SkillsInputModule,
		LanguageInputModule,
		ThemeModule,
		FormsModule,
		NbCardModule,
		NbListModule,
		NbActionsModule,
		ReactiveFormsModule,
		NbButtonModule,
		NbIconModule,
		NgSelectModule,
		NbDatepickerModule,
		NbInputModule,
		NbSelectModule,
		NbCheckboxModule,
		NbTooltipModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
		NbBadgeModule,
		NbToggleModule,
		NbTabsetModule,
		CKEditorModule
	],
	declarations: [PublicPageMutationComponent],
	entryComponents: [PublicPageMutationComponent],
	providers: [SkillsService, LanguagesService]
})
export class PublicPageMutationModule {}
