import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
	InvitationTypeEnum,
	RolesEnum,
	ComponentLayoutStyleEnum,
	IOrganization,
	IInviteViewModel
} from '@gauzy/models';
import { NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { filter, first, tap } from 'rxjs/operators';
import { InviteService } from '../../../@core/services/invite.service';
import { Store } from '../../../@core/services/store.service';
import { DeleteConfirmationComponent } from '../../user/forms/delete-confirmation/delete-confirmation.component';
import { InviteMutationComponent } from '../invite-mutation/invite-mutation.component';
import { ProjectNamesComponent } from './project-names/project-names.component';
import moment = require('moment-timezone');
import { ResendConfirmationComponent } from './resend-confirmation/resend-confirmation.component';
import { ClientNamesComponent } from './client-names/client-names.component';
import { DepartmentNamesComponent } from './department-names/department-names.component';
import { TranslationBaseComponent } from '../../language-base/translation-base.component';
import { ComponentEnum } from '../../../@core/constants/layout.constants';
import { RouterEvent, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from '../../../@core/services/toastr.service';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'ga-invites',
	templateUrl: './invites.component.html',
	styleUrls: ['invites.component.scss']
})
export class InvitesComponent
	extends TranslationBaseComponent
	implements OnInit, OnDestroy {
	@Input()
	invitationType: InvitationTypeEnum;

	organizationName: string;
	settingsSmartTable: object;
	sourceSmartTable = new LocalDataSource();
	selectedInvite: IInviteViewModel;
	selectedOrganizationId: string;
	viewComponentName: ComponentEnum;
	disableButton = true;
	dataLayoutStyle = ComponentLayoutStyleEnum.TABLE;
	invitedName = 'Employee / User';
	manageInvites: IInviteViewModel[];
	loading = true;
	selectedOrganization: IOrganization;

	invitesTable: Ng2SmartTableComponent;
	@ViewChild('invitesTable') set content(content: Ng2SmartTableComponent) {
		if (content) {
			this.invitesTable = content;
			this.onChangedSource();
		}
	}

	constructor(
		private dialogService: NbDialogService,
		private store: Store,
		private toastrService: ToastrService,
		private translate: TranslateService,
		private inviteService: InviteService,
		private router: Router
	) {
		super(translate);
		this.setView();
	}

	ngOnInit() {
		this._loadSmartTableSettings();
		this._applyTranslationOnSmartTable();

		this.store.selectedOrganization$
			.pipe(
				filter((organization) => !!organization),
				untilDestroyed(this)
			)
			.subscribe((organization) => {
				if (organization) {
					this.selectedOrganization = organization;
					this.selectedOrganizationId = organization.id;
					this.loadPage();
				}
			});
		this.router.events
			.pipe(untilDestroyed(this))
			.subscribe((event: RouterEvent) => {
				if (event instanceof NavigationEnd) {
					this.setView();
				}
			});
	}

	ngOnDestroy(): void {}

	setView() {
		this.viewComponentName = ComponentEnum.MANAGE_INVITES;
		this.store
			.componentLayout$(this.viewComponentName)
			.pipe(untilDestroyed(this))
			.subscribe((componentLayout) => {
				this.dataLayoutStyle = componentLayout;
			});
	}

	/*
	 * Table on changed source event
	 */
	onChangedSource() {
		this.invitesTable.source.onChangedSource
			.pipe(
				untilDestroyed(this),
				tap(() => this.clearItem())
			)
			.subscribe();
	}

	selectEmployeeTmp({ isSelected, data }) {
		this.disableButton = !isSelected;
		this.selectedInvite = isSelected ? data : null;
		if (this.selectedInvite) {
			const checkName = this.selectedInvite.fullName.trim();
			this.invitedName = checkName ? checkName : 'Employee / User';
		}
	}

	async invite() {
		const dialog = this.dialogService.open(InviteMutationComponent, {
			context: {
				invitationType: this.invitationType,
				selectedOrganizationId: this.selectedOrganizationId,
				currentUserId: this.store.userId,
				selectedOrganization: this.selectedOrganization
			}
		});

		await dialog.onClose.pipe(first()).toPromise();
		this.loadPage();
	}

	copyToClipboard(selectedItem?: IInviteViewModel) {
		if (selectedItem) {
			this.selectEmployeeTmp({
				isSelected: true,
				data: selectedItem
			});
		}
		const textField = document.createElement('textarea');
		textField.innerText =
			location.origin + '/#/' + this.selectedInvite.inviteUrl;
		document.body.appendChild(textField);
		textField.select();
		document.execCommand('copy');
		textField.remove();

		this.toastrService.success('TOASTR.MESSAGE.COPIED');
		this.clearItem();
	}

	private async loadPage() {
		let invites = [];
		try {
			const { tenantId } = this.store.user;
			const { items } = await this.inviteService.getAll(
				[
					'projects',
					'invitedBy',
					'role',
					'organizationContact',
					'departments'
				],
				{ organizationId: this.selectedOrganizationId, tenantId }
			);
			invites = items.filter((invite) => {
				return this.invitationType === InvitationTypeEnum.USER
					? invite.role.name === RolesEnum.EMPLOYEE
					: invite.role.name !== RolesEnum.EMPLOYEE;
			});
		} catch (error) {
			this.toastrService.danger('TOASTR.MESSAGE.INVITES_LOAD');
		}

		const { name } = this.store.selectedOrganization;
		const invitesVm: IInviteViewModel[] = [];

		for (const invite of invites) {
			invitesVm.push({
				email: invite.email,
				expireDate: moment(invite.expireDate).fromNow(),
				imageUrl: invite.invitedBy ? invite.invitedBy.imageUrl : '',
				fullName: `${
					(invite.invitedBy && invite.invitedBy.firstName) || ''
				} ${(invite.invitedBy && invite.invitedBy.lastName) || ''}`,
				roleName: invite.role
					? this.getTranslation(`USERS_PAGE.ROLE.${invite.role.name}`)
					: '',
				status: moment(invite.expireDate).isAfter(moment())
					? this.getTranslation(`INVITE_PAGE.STATUS.${invite.status}`)
					: this.getTranslation(`INVITE_PAGE.STATUS.EXPIRED`),
				projectNames: (invite.projects || []).map(
					(project) => project.name
				),
				clientNames: (invite.organizationContact || []).map(
					(organizationContact) => organizationContact.name
				),
				departmentNames: (invite.departments || []).map(
					(department) => department.name
				),
				id: invite.id,
				inviteUrl: `auth/accept-invite?email=${invite.email}&token=${invite.token}`
			});
		}
		this.manageInvites = invitesVm;
		this.sourceSmartTable.load(invitesVm);
		this.organizationName = name;
		this.loading = false;
	}

	private _loadSmartTableSettings() {
		const settingsSmartTable = {
			actions: false,
			columns: {
				email: {
					title: this.getTranslation('SM_TABLE.EMAIL'),
					type: 'email'
				},
				roleName: {
					title: this.getTranslation('SM_TABLE.ROLE'),
					type: 'text'
				},
				projects: {
					title: this.getTranslation('SM_TABLE.PROJECTS'),
					type: 'custom',
					renderComponent: ProjectNamesComponent,
					filter: false
				},
				contact: {
					title: this.getTranslation('SM_TABLE.CONTACTS'),
					type: 'custom',
					renderComponent: ClientNamesComponent,
					filter: false
				},
				departments: {
					title: this.getTranslation('SM_TABLE.DEPARTMENTS'),
					type: 'custom',
					renderComponent: DepartmentNamesComponent,
					filter: false
				},
				fullName: {
					title: this.getTranslation('SM_TABLE.INVITED_BY'),
					type: 'text'
				},
				expireDate: {
					title: this.getTranslation('SM_TABLE.EXPIRE_DATE'),
					type: 'text'
				},
				status: {
					title: this.getTranslation('SM_TABLE.STATUS'),
					type: 'text'
				}
			},
			pager: {
				display: true,
				perPage: 8
			}
		};

		if (this.invitationType === InvitationTypeEnum.EMPLOYEE) {
			delete settingsSmartTable['columns']['roleName'];
		}

		if (this.invitationType === InvitationTypeEnum.USER) {
			delete settingsSmartTable['columns']['projects'];
			delete settingsSmartTable['columns']['contact'];
			delete settingsSmartTable['columns']['departments'];
		}
		if (this.invitationType === InvitationTypeEnum.CANDIDATE) {
			delete settingsSmartTable['columns']['projects'];
			delete settingsSmartTable['columns']['contact'];
			delete settingsSmartTable['columns']['roleName'];
		}

		this.settingsSmartTable = settingsSmartTable;
	}

	async deleteInvite(selectedItem?: IInviteViewModel) {
		if (selectedItem) {
			this.selectEmployeeTmp({
				isSelected: true,
				data: selectedItem
			});
		}
		this.dialogService
			.open(DeleteConfirmationComponent, {
				context: {
					recordType:
						this.selectedInvite.email +
						' ' +
						this.getTranslation(
							'FORM.DELETE_CONFIRMATION.INVITATION'
						)
				}
			})
			.onClose.pipe(untilDestroyed(this))
			.subscribe(async (result) => {
				if (result) {
					try {
						await this.inviteService.delete(this.selectedInvite.id);
						this.toastrService.success(
							'TOASTR.MESSAGE.INVITES_DELETE',
							{ email: this.selectedInvite.email }
						);
						this.clearItem();
						this.loadPage();
					} catch (error) {
						this.toastrService.danger(
							error.error.message || error.message
						);
					}
				}
			});
	}

	async resendInvite(selectedItem?: IInviteViewModel) {
		if (selectedItem) {
			this.selectEmployeeTmp({
				isSelected: true,
				data: selectedItem
			});
		}
		this.dialogService
			.open(ResendConfirmationComponent, {
				context: {
					email: this.selectedInvite.email
				}
			})
			.onClose.pipe(untilDestroyed(this))
			.subscribe(async (result) => {
				if (result) {
					try {
						await this.inviteService.resendInvite({
							id: this.selectedInvite.id,
							invitedById: this.store.userId
						});

						this.toastrService.success(
							'TOASTR.MESSAGE.INVITES_RESEND',
							{ email: this.selectedInvite.email }
						);

						this.loadPage();
					} catch (error) {
						this.toastrService.danger(error);
					}
				}
			});
	}

	private _applyTranslationOnSmartTable() {
		this.translate.onLangChange.pipe(untilDestroyed(this)).subscribe(() => {
			this._loadSmartTableSettings();
		});
	}

	/*
	 * Clear selected item
	 */
	clearItem() {
		this.selectEmployeeTmp({
			isSelected: false,
			data: null
		});
		this.deselectAll();
	}

	/*
	 * Deselect all table rows
	 */
	deselectAll() {
		if (this.invitesTable && this.invitesTable.grid) {
			this.invitesTable.grid.dataSet['willSelect'] = 'false';
			this.invitesTable.grid.dataSet.deselectAll();
		}
	}
}
