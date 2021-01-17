import { AddIconModule } from './add-icon/add-icon.module';
import { NgModule } from '@angular/core';
import { HttpLoaderFactory, ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	NbCardModule,
	NbIconModule,
	NbButtonModule,
	NbInputModule,
	NbSelectModule,
	NbSidebarModule,
	NbLayoutModule,
	NbActionsModule,
	NbContextMenuModule
} from '@nebular/theme';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from './sidebar.component';
import { TreeModule } from '@circlon/angular-tree-component';
import { CKEditorModule } from 'ng2-ckeditor';
import { HelpCenterService } from '../../@core/services/help-center.service';
import { EditBaseModule } from './edit-base/edit-base.module';
import { EditCategoryModule } from './edit-category/edit-category.module';
import { DeleteCategoryModule } from './delete-category/delete-category.module';
import { DeleteBaseModule } from './delete-base/delete-base.module';

@NgModule({
	imports: [
		AddIconModule,
		EditBaseModule,
		DeleteBaseModule,
		EditCategoryModule,
		DeleteCategoryModule,
		CKEditorModule,
		NbActionsModule,
		NbContextMenuModule,
		TreeModule,
		NbSelectModule,
		ThemeModule,
		FormsModule,
		NbCardModule,
		NbIconModule,
		ReactiveFormsModule,
		NbButtonModule,
		NbInputModule,
		NbLayoutModule,
		NbSidebarModule.forRoot(),
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	providers: [HelpCenterService],
	declarations: [SidebarComponent],
	exports: [SidebarComponent]
})
export class SidebarModule {}
