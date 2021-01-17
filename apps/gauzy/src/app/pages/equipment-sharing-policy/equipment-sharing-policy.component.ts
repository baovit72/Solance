import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TranslationBaseComponent } from '../../@shared/language-base/translation-base.component';
import { TranslateService } from '@ngx-translate/core';
import {
	IEquipmentSharing,
	ComponentLayoutStyleEnum,
	IEquipmentSharingPolicy,
	IOrganization
} from '@gauzy/models';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { filter, first, tap } from 'rxjs/operators';
import { DeleteConfirmationComponent } from '../../@shared/user/forms/delete-confirmation/delete-confirmation.component';
import { Store } from '../../@core/services/store.service';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { ComponentEnum } from '../../@core/constants/layout.constants';
import { EquipmentSharingPolicyService } from '../../@core/services/equipment-sharing-policy.service';
import { EquipmentSharingPolicyMutationComponent } from '../../@shared/equipment-sharing-policy/equipment-sharing-policy-mutation.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from '../../@core/services/toastr.service';
@UntilDestroy({ checkProperties: true })
@Component({
	templateUrl: './equipment-sharing-policy.component.html',
	styleUrls: ['./equipment-sharing-policy.component.scss']
})
export class EquipmentSharingPolicyComponent
	extends TranslationBaseComponent
	implements OnInit, OnDestroy {
	settingsSmartTable: object;
	loading: boolean;
	selectedEquipmentSharingPolicy: IEquipmentSharingPolicy;
	smartTableSource = new LocalDataSource();
	form: FormGroup;
	disableButton = true;
	equipmentSharingPolicyData: IEquipmentSharingPolicy[];
	viewComponentName: ComponentEnum;
	dataLayoutStyle = ComponentLayoutStyleEnum.TABLE;
	selectedOrganization: IOrganization;

	equipmentSharingPolicyTable: Ng2SmartTableComponent;
	@ViewChild('equipmentSharingPolicyTable') set content(
		content: Ng2SmartTableComponent
	) {
		if (content) {
			this.equipmentSharingPolicyTable = content;
			this.onChangedSource();
		}
	}

	constructor(
		readonly translateService: TranslateService,
		private equipmentSharingPolicyService: EquipmentSharingPolicyService,
		private dialogService: NbDialogService,
		private toastrService: ToastrService,
		private store: Store,
		private router: Router
	) {
		super(translateService);
		this.setView();
	}

	ngOnInit(): void {
		this.loadSmartTable();
		this._applyTranslationOnSmartTable();
		this.store.selectedOrganization$
			.pipe(
				filter((organization) => !!organization),
				tap(
					(organization) => (this.selectedOrganization = organization)
				),
				untilDestroyed(this)
			)
			.subscribe((organization) => {
				if (organization) {
					this.loadSettings();
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

	setView() {
		this.viewComponentName = ComponentEnum.EQUIPMENT_SHARING_POLICY;
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
		this.equipmentSharingPolicyTable.source.onChangedSource
			.pipe(
				untilDestroyed(this),
				tap(() => this.clearItem())
			)
			.subscribe();
	}

	async loadSmartTable() {
		this.settingsSmartTable = {
			actions: false,
			columns: {
				name: {
					title: this.getTranslation(
						'EQUIPMENT_SHARING_POLICY_PAGE.EQUIPMENT_SHARING_POLICY_NAME'
					),
					type: 'string'
				},
				description: {
					title: this.getTranslation(
						'EQUIPMENT_SHARING_POLICY_PAGE.EQUIPMENT_SHARING_POLICY_DESCRIPTION'
					),
					type: 'string',
					filter: false
				}
			}
		};
	}

	async save(selectedItem?: IEquipmentSharingPolicy) {
		if (selectedItem) {
			this.selectEquipmentSharingPolicy({
				isSelected: true,
				data: selectedItem
			});
		}
		const dialog = this.dialogService.open(
			EquipmentSharingPolicyMutationComponent,
			{
				context: {
					equipmentSharingPolicy: this.selectedEquipmentSharingPolicy,
					selectedOrganization: this.selectedOrganization
				}
			}
		);
		const equipmentSharingPolicy = await dialog.onClose
			.pipe(first())
			.toPromise();
		this.selectedEquipmentSharingPolicy = null;
		this.disableButton = true;

		if (equipmentSharingPolicy) {
			this.toastrService.success(
				'EQUIPMENT_SHARING_POLICY_PAGE.MESSAGES.EQUIPMENT_REQUEST_SAVED',
				{
					name: equipmentSharingPolicy.name
				}
			);
		}

		this.loadSettings();
		this.clearItem();
	}

	async delete(selectedItem?: IEquipmentSharing) {
		if (selectedItem) {
			this.selectEquipmentSharingPolicy({
				isSelected: true,
				data: selectedItem
			});
		}
		const result = await this.dialogService
			.open(DeleteConfirmationComponent)
			.onClose.pipe(first())
			.toPromise();

		if (result) {
			await this.equipmentSharingPolicyService.delete(
				this.selectedEquipmentSharingPolicy.id
			);

			this.loadSettings();
			this.clearItem();
			this.toastrService.success(
				'EQUIPMENT_SHARING_POLICY_PAGE.MESSAGES.EQUIPMENT_REQUEST_DELETED',
				{
					name: this.selectedEquipmentSharingPolicy.name
				}
			);
		}
	}

	async selectEquipmentSharingPolicy({ isSelected, data }) {
		this.disableButton = !isSelected;
		this.selectedEquipmentSharingPolicy = isSelected ? data : null;
	}

	async loadSettings() {
		this.loading = true;

		let findInput: IEquipmentSharingPolicy = {};
		let policies = [];
		if (this.selectedOrganization) {
			const { tenantId } = this.store.user;
			const { id: organizationId } = this.selectedOrganization;
			findInput = {
				organizationId,
				tenantId
			};
		}
		policies = (
			await this.equipmentSharingPolicyService.getAll(
				['organization'],
				findInput
			)
		).items;

		this.loading = false;
		this.equipmentSharingPolicyData = policies;
		this.smartTableSource.load(policies);
	}

	_applyTranslationOnSmartTable() {
		this.translateService.onLangChange
			.pipe(untilDestroyed(this))
			.subscribe(() => {
				this.loadSmartTable();
			});
	}

	/*
	 * Clear selected item
	 */
	clearItem() {
		this.selectEquipmentSharingPolicy({
			isSelected: false,
			data: null
		});
		this.deselectAll();
	}
	/*
	 * Deselect all table rows
	 */
	deselectAll() {
		if (
			this.equipmentSharingPolicyTable &&
			this.equipmentSharingPolicyTable.grid
		) {
			this.equipmentSharingPolicyTable.grid.dataSet['willSelect'] =
				'false';
			this.equipmentSharingPolicyTable.grid.dataSet.deselectAll();
		}
	}

	ngOnDestroy() {}
}
