import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deal } from './deal.entity';
import { StageModule } from '../pipeline-stage/pipeline-stage.module';
import { AuthModule } from '../auth/auth.module';
import { DealController } from './deal.controller';
import { DealService } from './deal.service';
import { TenantModule } from '../tenant/tenant.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Deal]),
		StageModule,
		AuthModule,
		TenantModule
	],
	controllers: [DealController],
	providers: [DealService],
	exports: [DealService]
})
export class DealModule {}
