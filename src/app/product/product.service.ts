import { Repository } from 'typeorm';
import { IPagination } from '../core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { IProductCreateInput, IProductFindInput } from '@gauzy/models';
import { TenantAwareCrudService } from '../core/crud/tenant-aware-crud.service';

@Injectable()
export class ProductService extends TenantAwareCrudService<Product> {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>
	) {
		super(productRepository);
	}

	async findAllProducts(
		langCode?: string,
		relations?: string[],
		findInput?: IProductFindInput
	): Promise<IPagination<Product>> {
		const total = await this.productRepository.count(findInput);
		const items = await this.productRepository.find({
			relations: relations,
			where: findInput
		});

		if (langCode) {
			//tstodo write method
			items.forEach((product) => {
				if (product.type) {
					product.type = product.type.translate(langCode);
				}

				if (product.category) {
					product.category = product.category.translate(langCode);
				}
			});
		}

		return { items, total };
	}

	async findById(id: string, options: any): Promise<Product> {
		return await this.productRepository.findOne(id, options);
	}

	async saveProduct(productRequest: IProductCreateInput): Promise<Product> {
		return await this.productRepository.save(productRequest);
	}
}
