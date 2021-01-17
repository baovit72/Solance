import { EquipmentService } from '../../@core/services/equipment.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
	NbIconModule,
	NbCardModule,
	NbButtonModule,
	NbInputModule,
	NbSelectModule,
	NbCheckboxModule
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpLoaderFactory, ThemeModule } from '../../@theme/theme.module';
import { EquipmentMutationComponent } from './equipment-mutation.component';
import { Store } from '../../@core/services/store.service';
import { TagsColorInputModule } from '../tags/tags-color-input/tags-color-input.module';
import { CurrencyModule } from '../currency/currency.module';
@NgModule({
	imports: [
		TagsColorInputModule,
		ThemeModule,
		FormsModule,
		NbCardModule,
		NbIconModule,
		NbCheckboxModule,
		ReactiveFormsModule,
		NbButtonModule,
		NbInputModule,
		NbSelectModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
		CurrencyModule
	],
	declarations: [EquipmentMutationComponent],
	entryComponents: [],
	providers: [EquipmentService, Store]
})
export class EquipmentMutationModule {}
