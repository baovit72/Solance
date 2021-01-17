import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureToggleComponent } from '../../../@shared/feature-toggle/feature-toggle.component';
import { FeatureComponent } from './feature.component';

const routes: Routes = [
	{
		path: '',
		component: FeatureComponent,
		children: [
			{
				path: '',
				redirectTo: 'tenant',
				pathMatch: 'full'
			},
			{
				path: 'tenant',
				component: FeatureToggleComponent,
				data: { isOrganization: false }
			},
			{
				path: 'organization',
				component: FeatureToggleComponent,
				data: { isOrganization: true }
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FeatureRoutingModule {}
