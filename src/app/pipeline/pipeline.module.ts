import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PipelineController } from './pipeline.controller';
import { PipelineService } from './pipeline.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pipeline } from './pipeline.entity';
import { StageModule } from '../pipeline-stage/pipeline-stage.module';
import { DealModule } from '../deal/deal.module';
import { Deal } from '../deal/deal.entity';
import { User } from '../user/user.entity';
import { TenantModule } from '../tenant/tenant.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Pipeline, Deal, User]),
		StageModule,
		DealModule,
		AuthModule,
		TenantModule
	],
	controllers: [PipelineController],
	providers: [PipelineService],
	exports: [PipelineService]
})
export class PipelineModule {}
