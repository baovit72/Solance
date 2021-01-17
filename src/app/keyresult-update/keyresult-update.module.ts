import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyResultUpdateService } from './keyresult-update.service';
import { KeyResultUpdateController } from './keyresult-update.controller';
import { KeyResultUpdate } from './keyresult-update.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { TenantModule } from '../tenant/tenant.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([KeyResultUpdate]),
		CqrsModule,
		TenantModule
	],
	controllers: [KeyResultUpdateController],
	providers: [KeyResultUpdateService, ...CommandHandlers],
	exports: [KeyResultUpdateService]
})
export class KeyResultUpdateModule {}
