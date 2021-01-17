import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
	IProduct,
	IProductOption,
	ITag,
	IProductTypeTranslated,
	IVariantOptionCombination,
	IProductCategoryTranslated,
	IProductVariant,
	LanguagesEnum,
	IOrganization
} from '@gauzy/models';
import { TranslateService } from '@ngx-translate/core';
import { ProductTypeService } from 'apps/gauzy/src/app/@core/services/product-type.service';
import { ProductCategoryService } from 'apps/gauzy/src/app/@core/services/product-category.service';
import { TranslationBaseComponent } from 'apps/gauzy/src/app/@shared/language-base/translation-base.component';
import { Subject, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ProductService } from 'apps/gauzy/src/app/@core/services/product.service';
import { Location } from '@angular/common';
import { Store } from 'apps/gauzy/src/app/@core/services/store.service';
import { ProductVariantService } from 'apps/gauzy/src/app/@core/services/product-variant.service';
import { ToastrService } from 'apps/gauzy/src/app/@core/services/toastr.service';

@Component({
	selector: 'ngx-product-form',
	templateUrl: './product-form.component.html',
	styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent
	extends TranslationBaseComponent
	implements OnInit, OnDestroy {
	form: FormGroup;
	inventoryItem: IProduct;

	hoverState: boolean;
	selectedOrganizationId = '';
	productTypes: IProductTypeTranslated[];
	productCategories: IProductCategoryTranslated[];

	options: Array<IProductOption> = [];
	deletedOptions: Array<IProductOption> = [];

	optionsCombinations: Array<IVariantOptionCombination> = [];
	variants$: BehaviorSubject<IProductVariant[]> = new BehaviorSubject([]);

	languages: any[];
	tags: ITag[] = [];
	organization: IOrganization;
	productId: string;
	private ngDestroy$ = new Subject<void>();

	constructor(
		readonly translationService: TranslateService,
		private fb: FormBuilder,
		private readonly store: Store,
		private productService: ProductService,
		private productTypeService: ProductTypeService,
		private productCategoryService: ProductCategoryService,
		private route: ActivatedRoute,
		private location: Location,
		private router: Router,
		private toastrService: ToastrService,
		private productVariantService: ProductVariantService
	) {
		super(translationService);
	}

	ngOnInit() {
		this.route.params
			.pipe(takeUntil(this.ngDestroy$))
			.subscribe(async (params) => {
				this.productId = params.id || null;
			});
		this.store.selectedOrganization$
			.pipe(takeUntil(this.ngDestroy$))
			.subscribe((organization: IOrganization) => {
				if (organization) {
					this.organization = organization;
					this.selectedOrganizationId = organization.id;
					this.loadProductTypes();
					this.loadProductCategories();
					this.loadProduct(this.productId);
				}
			});
		this.store.systemLanguages$
			.pipe(takeUntil(this.ngDestroy$))
			.subscribe((systemLanguages) => {
				if (systemLanguages && systemLanguages.length > 0) {
					this.languages = systemLanguages.map((item) => {
						return {
							value: item.code,
							name: item.name
						};
					});
				}
			});
	}

	ngOnDestroy(): void {
		this.ngDestroy$.next();
		this.ngDestroy$.complete();
	}

	private _initializeForm() {
		this.form = this.fb.group({
			tags: [this.inventoryItem ? this.inventoryItem.tags : ''],
			name: [
				this.inventoryItem ? this.inventoryItem.name : '',
				Validators.required
			],
			code: [
				this.inventoryItem ? this.inventoryItem.code : '',
				Validators.required
			],
			imageUrl: [this.inventoryItem ? this.inventoryItem.imageUrl : null],
			productTypeId: [
				this.inventoryItem ? this.inventoryItem.productTypeId : '',
				Validators.required
			],
			productCategoryId: [
				this.inventoryItem ? this.inventoryItem.productCategoryId : '',
				Validators.required
			],
			enabled: [this.inventoryItem ? this.inventoryItem.enabled : true],
			description: [
				this.inventoryItem ? this.inventoryItem.description : ''
			],
			language: [
				this.inventoryItem && this.inventoryItem.language
					? this.inventoryItem.language
					: '',
				Validators.required
			]
		});
	}

	async loadProduct(id: string) {
		if (id) {
			const { id: organizationId, tenantId } = this.organization;
			this.inventoryItem = await this.productService.getById(
				id,
				['category', 'type', 'options', 'variants', 'tags'],
				{ organizationId, tenantId }
			);
		}

		this.variants$.next(
			this.inventoryItem ? this.inventoryItem.variants : []
		);

		this.options = this.inventoryItem ? this.inventoryItem.options : [];
		this.tags = this.inventoryItem ? this.inventoryItem.tags : [];

		this._initializeForm();
	}

	async loadProductTypes() {
		const { id: organizationId, tenantId } = this.organization;
		const searchCriteria = {
			organization: { id: organizationId },
			tenantId
		};
		const { items = [] } = await this.productTypeService.getAllTranslated(
			this.store.preferredLanguage || LanguagesEnum.ENGLISH,
			[],
			searchCriteria
		);
		this.productTypes = items;
	}

	async loadProductCategories() {
		const { id: organizationId, tenantId } = this.organization;
		const searchCriteria = {
			organization: { id: organizationId },
			tenantId
		};
		const {
			items = []
		} = await this.productCategoryService.getAllTranslated(
			this.store.preferredLanguage || LanguagesEnum.ENGLISH,
			[],
			searchCriteria
		);
		this.productCategories = items;
	}

	async onSaveRequest() {
		const { id: organizationId, tenantId } = this.organization;
		const productRequest = {
			tags: this.form.get('tags').value,
			name: this.form.get('name').value,
			code: this.form.get('code').value,
			imageUrl: this.form.get('imageUrl').value,
			productTypeId: this.form.get('productTypeId').value,
			productCategoryId: this.form.get('productCategoryId').value,
			enabled: this.form.get('enabled').value,
			description: this.form.get('description').value,
			optionCreateInputs: this.options,
			optionDeleteInputs: this.deletedOptions,
			category: this.productCategories.find((c) => {
				return c.id === this.form.get('productCategoryId').value;
			}),
			type: this.productTypes.find((p) => {
				return p.id === this.form.get('productTypeId').value;
			}),
			tenantId: tenantId,
			organizationId: organizationId,
			language: this.form.get('language').value
		};

		if (this.inventoryItem) {
			productRequest['id'] = this.inventoryItem.id;
		}

		try {
			let productResult: IProduct;

			if (!productRequest['id']) {
				productResult = await this.productService.create(
					productRequest
				);
			} else {
				productResult = await this.productService.update(
					productRequest
				);
			}

			await this.productVariantService.createProductVariants({
				product: productResult,
				optionCombinations: this.optionsCombinations
			});

			await this.loadProduct(productResult.id);

			this.router.navigate([
				`/pages/organization/inventory/edit/${this.inventoryItem.id}`
			]);

			this.toastrService.success('INVENTORY_PAGE.INVENTORY_ITEM_SAVED', {
				name: productResult.name
			});
		} catch (err) {
			this.toastrService.danger('TOASTR.MESSAGE.SOMETHING_BAD_HAPPENED');
		}
	}

	onOptionsUpdated(options: IProductOption[]) {
		this.options = options;
	}

	onOptionDeleted(option: IProductOption) {
		this.deletedOptions.push(option);
	}

	handleImageUploadError(error: any) {
		this.toastrService.danger(error.error.message || error.message);
	}

	onCancel() {
		this.location.back();
	}

	selectedTagsEvent(currentSelection: ITag[]) {
		this.form.get('tags').setValue(currentSelection);
	}

	onOptionCombinationsInputsUpdate(
		optionsCombinations: IVariantOptionCombination[]
	) {
		this.optionsCombinations = optionsCombinations;
	}
}
