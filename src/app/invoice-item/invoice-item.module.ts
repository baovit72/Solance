import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceItem } from './invoice-item.entity';
import { InvoiceItemController } from './invoice-item.controller';
import { InvoiceItemService } from './invoice-item.service';
import { TenantModule } from '../tenant/tenant.module';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { CommandHandlers } from './commands/handlers';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
	imports: [
		TypeOrmModule.forFeature([InvoiceItem, User]),
		CqrsModule,
		TenantModule
	],
	controllers: [InvoiceItemController],
	providers: [InvoiceItemService, UserService, ...CommandHandlers],
	exports: [InvoiceItemService]
})
export class InvoiceItemModule {}
