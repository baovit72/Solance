import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { UsersComponent } from './users.component';
import { ManageUserInviteComponent } from './manage-user-invite/manage-user-invite.component';
import { InviteGuard } from '../../@core/role/invite.guard';
import { PermissionsEnum } from '@gauzy/models';
import { EditUserDataComponent } from './edit-user-profile/edit-user-data/edit-user-data.component';
import { EditUserOrganizationsComponent } from './edit-user-profile/edit-user-organizations/edit-user-organizations.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

export function redirectTo() {
	return '/pages';
}

const routes: Routes = [
	{
		path: '',
		component: UsersComponent,
		canActivate: [NgxPermissionsGuard],
		data: {
			permissions: {
				only: [PermissionsEnum.ORG_USERS_VIEW],
				redirectTo
			}
		}
	},
	{
		path: 'edit/:id',
		component: EditUserProfileComponent,
		canActivate: [NgxPermissionsGuard],
		data: {
			permissions: {
				only: [PermissionsEnum.ORG_USERS_EDIT],
				redirectTo
			}
		},
		children: [
			{
				path: '',
				component: EditUserDataComponent
			},
			{
				path: 'organizations',
				component: EditUserOrganizationsComponent
			}
		]
	},
	{
		path: 'invites',
		component: ManageUserInviteComponent,
		canActivate: [InviteGuard],
		data: {
			expectedPermissions: [
				PermissionsEnum.ORG_INVITE_EDIT,
				PermissionsEnum.ORG_INVITE_VIEW
			]
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UsersRoutingModule {}
