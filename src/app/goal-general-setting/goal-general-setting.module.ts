import { Module } from '@nestjs/common';
import { GoalGeneralSettingController } from './goal-general-setting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalGeneralSetting } from './goal-general-setting.entity';
import { GoalGeneralSettingService } from './goal-general-setting.service';
import { TenantModule } from '../tenant/tenant.module';

@Module({
	imports: [TypeOrmModule.forFeature([GoalGeneralSetting]), TenantModule],
	controllers: [GoalGeneralSettingController],
	providers: [GoalGeneralSettingService],
	exports: [GoalGeneralSettingService]
})
export class GoalGeneralSettingModule {}
