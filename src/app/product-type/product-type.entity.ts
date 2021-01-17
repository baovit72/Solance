import { Entity, Column, OneToMany } from 'typeorm';
import { ProductTypesIconsEnum } from '@gauzy/models';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { Product } from '../product/product.entity';
import { TranslatableBase } from '../core/entities/translate-base';
import { ProductTypeTranslation } from './product-type-translation.entity';

@Entity('product_type')
export class ProductType extends TranslatableBase {
	@ApiProperty({ type: String, enum: ProductTypesIconsEnum })
	@IsOptional()
	@IsEnum(ProductTypesIconsEnum)
	@Column({ nullable: true })
	icon: string;

	@OneToMany((type) => Product, (product) => product.type)
	products: Product[];

	@ApiProperty({ type: ProductTypeTranslation, isArray: true })
	@OneToMany(
		(type) => ProductTypeTranslation,
		(productTypeTranslation) => productTypeTranslation.reference,
		{
			eager: true,
			cascade: true
		}
	)
	translations: ProductTypeTranslation[];
}
