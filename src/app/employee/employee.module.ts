import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { CommandHandlers } from './commands/handlers';
import { EmployeeController } from './employee.controller';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
import { AuthService } from '../auth/auth.service';
import { EmailService, EmailModule } from '../email';
import { UserOrganizationModule } from '../user-organization/user-organization.module';
import { TimeLog } from '../timesheet/time-log.entity';
import { TenantModule } from '../tenant/tenant.module';
import { GauzyAIService } from '@gauzy/integration-ai';

@Module({
	imports: [
		TypeOrmModule.forFeature([Employee, User, TimeLog]),
		EmailModule,
		UserOrganizationModule,
		CqrsModule,
		TenantModule
	],
	controllers: [EmployeeController],
	providers: [
		EmployeeService,
		UserService,
		AuthService,
		EmailService,
		GauzyAIService,
		...CommandHandlers
	],
	exports: [TypeOrmModule, EmployeeService]
})
export class EmployeeModule {}
