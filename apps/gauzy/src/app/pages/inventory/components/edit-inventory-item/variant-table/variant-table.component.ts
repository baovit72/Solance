import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { TranslationBaseComponent } from 'apps/gauzy/src/app/@shared/language-base/translation-base.component';
import { IProductVariant } from '@gauzy/models';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { DeleteConfirmationComponent } from 'apps/gauzy/src/app/@shared/user/forms/delete-confirmation/delete-confirmation.component';
import { ProductVariantService } from 'apps/gauzy/src/app/@core/services/product-variant.service';
import { EnabledStatusComponent } from '../../table-components/enabled-row.component';
import { ToastrService } from 'apps/gauzy/src/app/@core/services/toastr.service';

export interface SelectedProductVariant {
	data: IProductVariant;
	isSelected: false;
}

@Component({
	selector: 'ngx-variant-table',
	templateUrl: './variant-table.component.html'
})
export class VariantTableComponent
	extends TranslationBaseComponent
	implements OnInit {
	@ViewChild('variantTable') variantTable;
	@Input() variants$: BehaviorSubject<any[]>;
	@Input() productId: string;
	variants: IProductVariant[];

	selectedItem: IProductVariant;
	settingsSmartTable: object;
	smartTableSource = new LocalDataSource();
	loading = true;
	disableButton = true;

	private _ngDestroy$ = new Subject<void>();

	constructor(
		readonly translateService: TranslateService,
		private router: Router,
		private dialogService: NbDialogService,
		private productVariantService: ProductVariantService,
		private toastrService: ToastrService
	) {
		super(translateService);
	}

	ngOnInit(): void {
		this.loadSmartTable();

		this.variants$
			.pipe(takeUntil(this._ngDestroy$))
			.subscribe((variants) => {
				this.variants = variants;
				this.smartTableSource.load(variants);
			});

		this.loading = false;
		this._applyTranslationOnSmartTable();
	}

	async loadSmartTable() {
		this.settingsSmartTable = {
			actions: false,
			columns: {
				options: {
					title: this.getTranslation('INVENTORY_PAGE.OPTIONS'),
					type: 'string',
					valuePrepareFunction: (_, variant) => {
						return variant.options && variant.options.length > 0
							? variant.options
									.map((option) => option.name)
									.join(', ')
							: this.getTranslation(
									'INVENTORY_PAGE.NO_OPTIONS_LABEL'
							  );
					}
				},
				internalReference: {
					title: this.getTranslation('INVENTORY_PAGE.CODE'),
					type: 'string'
				},
				quantity: {
					title: this.getTranslation('INVENTORY_PAGE.QUANTITY'),
					type: 'string'
				},
				enabled: {
					title: this.getTranslation('INVENTORY_PAGE.ENABLED'),
					type: 'custom',
					renderComponent: EnabledStatusComponent
				}
			}
		};
	}

	onEditVariant() {
		this.router.navigate([
			`/pages/organization/inventory/${this.productId}/variants/${this.selectedItem.id}`
		]);
	}

	async selectItem({ isSelected, data }) {
		const selectedItem = isSelected ? data : null;
		if (this.variantTable) {
			this.variantTable.grid.dataSet.willSelect = false;
		}
		this.disableButton = !isSelected;
		this.selectedItem = selectedItem;
	}

	async delete() {
		const result = await this.dialogService
			.open(DeleteConfirmationComponent)
			.onClose.pipe(first())
			.toPromise();

		if (!result) return;

		try {
			const res = await this.productVariantService.delete(
				this.selectedItem.id
			);

			if (res.affected > 0) {
				this.variants$.next(
					this.variants.filter(
						(variant) => variant.id !== this.selectedItem.id
					)
				);

				if (this.selectedItem) {
					this.selectItem({
						isSelected: true,
						data: null
					});
				}

				this.toastrService.success(
					'INVENTORY_PAGE.PRODUCT_VARIANT_DELETED'
				);
			}
		} catch {
			this.toastrService.danger('TOASTR.MESSAGE.SOMETHING_BAD_HAPPENED');
		}
	}

	_applyTranslationOnSmartTable() {
		this.translateService.onLangChange.subscribe(() => {
			this.loadSmartTable();
		});
	}
}
