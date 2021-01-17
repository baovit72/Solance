import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RolesEnum, IUser, ITag } from '@gauzy/models';
import { NbDialogRef } from '@nebular/theme';
import { Store } from '../../../@core/services/store.service';
import { ToastrService } from '../../../@core/services/toastr.service';
import { BasicInfoFormComponent } from '../forms/basic-info/basic-info-form.component';

@Component({
	selector: 'ga-user-mutation',
	templateUrl: './user-mutation.component.html',
	styleUrls: ['./user-mutation.component.scss']
})
export class UserMutationComponent implements OnInit {
	@ViewChild('userBasicInfo')
	userBasicInfo: BasicInfoFormComponent;
	tags: ITag[];
	selectedTags: any;

	@Input() public isSuperAdmin: boolean;

	constructor(
		protected dialogRef: NbDialogRef<UserMutationComponent>,
		protected store: Store,
		private toastrService: ToastrService
	) {}

	ngOnInit(): void {}
	selectedTagsEvent(ev) {
		this.tags = ev;
	}

	closeDialog(user: IUser = null) {
		this.dialogRef.close({ user });
	}

	async add() {
		try {
			const organization = this.store.selectedOrganization;
			const user = await this.userBasicInfo.registerUser(
				RolesEnum.VIEWER, //TODO: take role from the form.
				organization.id,
				this.store.userId
			);
			this.closeDialog(user);
		} catch (error) {
			this.toastrService.danger(error);
		}
	}
}
