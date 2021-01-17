import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	NbButtonModule,
	NbCardModule,
	NbDialogModule,
	NbIconModule,
	NbInputModule,
	NbTooltipModule,
	NbSelectModule,
	NbActionsModule,
	NbSpinnerModule
} from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory, ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../@shared/shared.module';
import { DocumentsComponent } from './documents.component';
import { DocumentsRoutingModule } from './documents-routing.module';
import { FileUploaderModule } from '../../@shared/file-uploader-input/file-uploader-input.module';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { CardGridModule } from '../../@shared/card-grid/card-grid.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TableComponentsModule } from '../../@shared/table-components/table-components.module';

const COMPONENTS = [DocumentsComponent, UploadDocumentComponent];

@NgModule({
	imports: [
		SharedModule,
		DocumentsRoutingModule,
		ThemeModule,
		NbCardModule,
		FormsModule,
		ReactiveFormsModule,
		NbButtonModule,
		NbInputModule,
		NbSelectModule,
		NbIconModule,
		NbActionsModule,
		CardGridModule,
		TableComponentsModule,
		Ng2SmartTableModule,
		NbDialogModule.forChild(),
		NbTooltipModule,
		FileUploaderModule,
		NgSelectModule,
		NbSpinnerModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	declarations: [...COMPONENTS],
	entryComponents: [],
	providers: []
})
export class DocumentsModule {}
