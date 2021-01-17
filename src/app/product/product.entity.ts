import {
	Entity,
	Column,
	OneToMany,
	RelationId,
	JoinColumn,
	ManyToOne,
	ManyToMany,
	JoinTable
} from 'typeorm';
import { IProduct } from '@gauzy/models';
import { ProductVariant } from '../product-variant/product-variant.entity';
import { ProductType } from '../product-type/product-type.entity';
import { ProductCategory } from '../product-category/product-category.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { ProductOption } from '../product-option/product-option.entity';
import { Tag } from '../tags/tag.entity';
import { InvoiceItem } from '../invoice-item/invoice-item.entity';
import { TenantOrganizationBase } from '../core/entities/tenant-organization-base';

@Entity('product')
export class Product extends TenantOrganizationBase implements IProduct {
	@ManyToMany((type) => Tag, (tag) => tag.product)
	@JoinTable({
		name: 'tag_product'
	})
	tags?: Tag[];

	@ApiProperty({ type: String })
	@IsString()
	@Column()
	name: string;

	@ApiProperty({ type: String })
	@IsString()
	@Column()
	description: string;

	@ApiPropertyOptional({ type: Boolean })
	@Column({ default: true })
	enabled: boolean;

	@ApiProperty({ type: String })
	@IsString()
	@Column()
	code: string;

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@Column({ nullable: true })
	imageUrl: string;

	@OneToMany(
		() => ProductVariant,
		(productVariant) => productVariant.product,
		{ onDelete: 'CASCADE' }
	)
	variants: ProductVariant[];

	@ApiProperty({ type: String, readOnly: true })
	@RelationId((product: Product) => product.type)
	productTypeId: string;

	@ApiProperty({ type: String, readOnly: true })
	@RelationId((product: Product) => product.category)
	productCategoryId: string;

	@ManyToOne(() => ProductType, { onDelete: 'SET NULL' })
	@JoinColumn()
	type: ProductType;

	@ManyToOne(() => ProductCategory, { onDelete: 'SET NULL' })
	@JoinColumn()
	category: ProductCategory;

	@OneToMany(
		(type) => ProductOption,
		(productOption) => productOption.product
	)
	options: ProductOption[];

	@ApiPropertyOptional({ type: InvoiceItem, isArray: true })
	@OneToMany((type) => InvoiceItem, (invoiceItem) => invoiceItem.product, {
		onDelete: 'SET NULL'
	})
	@JoinColumn()
	invoiceItems?: InvoiceItem[];

	@ApiProperty({ type: String, readOnly: true })
	@IsString()
	@Column({ nullable: true })
	language?: string;
}
