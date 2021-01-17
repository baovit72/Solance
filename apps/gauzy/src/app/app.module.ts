/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { HttpLoaderFactory, ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
	NbChatModule,
	NbDatepickerModule,
	NbDialogModule,
	NbMenuModule,
	NbSidebarModule,
	NbToastrModule,
	NbWindowModule,
	NbCalendarModule,
	NbCalendarKitModule
} from '@nebular/theme';
import { TokenInterceptor } from './@core/auth/token.interceptor';

import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import {
	cloudinaryConfiguration,
	environment
} from '../environments/environment';
import { FileUploadModule } from 'ng2-file-upload';
import { APIInterceptor } from './@core/api.interceptor';
import { ServerConnectionService } from './@core/services/server-connection.service';
import { Store } from './@core/services/store.service';
import { AppModuleGuard } from './app.module.guards';
import { DangerZoneMutationModule } from './@shared/settings/danger-zone-mutation.module';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';
import { SentryErrorHandler } from './@core/sentry-error.handler';
import { TimeTrackerModule } from './@shared/time-tracker/time-tracker.module';
import { SharedModule } from './@shared/shared.module';
import { HubstaffTokenInterceptor } from './@core/hubstaff-token-interceptor';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { LanguageInterceptor } from './@core/language.interceptor';
import { NgxElectronModule } from 'ngx-electron';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ColorPickerService } from 'ngx-color-picker';
import { EstimateEmailModule } from './auth/estimate-email/estimate-email.module';
import * as moment from 'moment';
import { TenantInterceptor } from './@core/tenant.interceptor';
import { NgxAuthModule } from './auth/auth.module';
import { LegalModule } from './legal/legal.module';
import { GoogleMapsLoaderService } from './@core/services/google-maps-loader.service';
import { Router } from '@angular/router';
import { FeatureToggleModule } from 'ngx-feature-toggle';
import { FeatureService } from './@core/services/feature/feature.service';
import { IFeatureToggle } from '@gauzy/models';

// TODO: we should use some internal function which returns version of Gauzy;
const version = '0.1.0';

export const cloudinary = {
	Cloudinary: CloudinaryCore
};

if (environment.SENTRY_DSN) {
	Sentry.init({
		dsn: environment.SENTRY_DSN,
		environment: environment.production ? 'production' : 'development',
		// this enables automatic instrumentation
		integrations: [
			new Integrations.BrowserTracing({
				routingInstrumentation: Sentry.routingInstrumentation
			})
		],
		// TODO: we should use some internal function which returns version of Gauzy
		release: 'gauzy@' + version,
		// set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring
		tracesSampleRate: 1
	});
}

@NgModule({
	declarations: [AppComponent],
	imports: [
		LegalModule,
		NgxAuthModule,
		EstimateEmailModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		DangerZoneMutationModule,
		AppRoutingModule,
		NbCalendarModule,
		NbCalendarKitModule,
		ThemeModule.forRoot(),
		NbSidebarModule.forRoot(),
		NbMenuModule.forRoot(),
		NbDatepickerModule.forRoot(),
		NbDialogModule.forRoot(),
		NbWindowModule.forRoot(),
		NbToastrModule.forRoot(),
		NbChatModule.forRoot({
			messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY'
		}),
		CoreModule.forRoot(),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
		CloudinaryModule.forRoot(cloudinary, cloudinaryConfiguration),
		FileUploadModule,
		TimeTrackerModule.forRoot(),
		environment.production ? [] : AkitaNgDevtools,
		SharedModule.forRoot(),
		NgxElectronModule,
		FeatureToggleModule,
		NgxPermissionsModule.forRoot()
	],
	bootstrap: [AppComponent],
	providers: [
		{
			provide: Sentry.TraceService,
			deps: [Router]
		},
		{ provide: APP_BASE_HREF, useValue: '/' },
		{
			provide: ErrorHandler,
			useClass: SentryErrorHandler
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: APIInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HubstaffTokenInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: LanguageInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TenantInterceptor,
			multi: true
		},
		ServerConnectionService,
		{
			provide: APP_INITIALIZER,
			useFactory: serverConnectionFactory,
			deps: [ServerConnectionService, Store],
			multi: true
		},
		GoogleMapsLoaderService,
		{
			provide: APP_INITIALIZER,
			useFactory: googleMapsLoaderFactory,
			deps: [GoogleMapsLoaderService],
			multi: true
		},
		FeatureService,
		{
			provide: APP_INITIALIZER,
			useFactory: featureToggleLoaderFactory,
			deps: [FeatureService, Store],
			multi: true
		},
		{
			provide: ErrorHandler,
			useClass: SentryErrorHandler
		},
		AppModuleGuard,
		ColorPickerService
	]
})
export class AppModule {
	constructor() {
		// Set Monday as start of the week
		moment.locale('en', {
			week: {
				dow: 1
			}
		});
		moment.locale('en');
	}
}

export function serverConnectionFactory(
	provider: ServerConnectionService,
	store: Store
) {
	return () => provider.load(environment.API_BASE_URL, store);
}

export function googleMapsLoaderFactory(provider: GoogleMapsLoaderService) {
	return () => provider.load(environment.GOOGLE_MAPS_API_KEY);
}

export function featureToggleLoaderFactory(
	provider: FeatureService,
	store: Store
) {
	return () =>
		provider.getFeatureToggles().then((features: IFeatureToggle[]) => {
			store.featureToggles = features || [];
			return features;
		});
}
