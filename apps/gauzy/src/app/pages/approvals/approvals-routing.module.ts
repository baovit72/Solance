import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionsEnum } from '@gauzy/models';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ApprovalsComponent } from './approvals.component';

const routes: Routes = [
	{
		path: '',
		component: ApprovalsComponent,
		canActivate: [NgxPermissionsGuard],
		data: {
			permissions: {
				only: [PermissionsEnum.REQUEST_APPROVAL_VIEW],
				redirectTo: '/pages'
			}
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ApprovalsRoutingModule {}
