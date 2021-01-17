import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ServerDownPage } from './server-down.page';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory, ThemeModule } from '../@theme/theme.module';
import { NbSidebarModule, NbLayoutModule } from '@nebular/theme';

const routes: Routes = [
	{
		path: '',
		component: ServerDownPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ThemeModule,
		NbSidebarModule,
		NbLayoutModule,
		RouterModule.forChild(routes),
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	declarations: [ServerDownPage]
})
export class ServerDownModule {}
