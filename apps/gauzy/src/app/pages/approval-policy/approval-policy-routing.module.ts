import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionsEnum } from '@gauzy/models';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ApprovalPolicyComponent } from './approval-policy.component';

const routes: Routes = [
	{
		path: '',
		component: ApprovalPolicyComponent,
		canActivate: [NgxPermissionsGuard],
		data: {
			permissions: {
				only: [PermissionsEnum.APPROVAL_POLICY_VIEW],
				redirectTo: '/pages'
			}
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ApprovalPolicyRoutingModule {}
