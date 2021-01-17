import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from './product-type.entity';
import { Module } from '@nestjs/common';
import { ProductTypeController } from './product-type.controller';
import { ProductTypeService } from './product-type.service';
import { ProductTypeTranslation } from './product-type-translation.entity';
import { TenantModule } from '../tenant/tenant.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([ProductType, ProductTypeTranslation]),
		TenantModule
	],
	controllers: [ProductTypeController],
	providers: [ProductTypeService]
})
export class ProductTypesModule {}
