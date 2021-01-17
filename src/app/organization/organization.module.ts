import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../role/role.entity';
import { RoleService } from '../role/role.service';
import { TenantModule } from '../tenant/tenant.module';
import { UserOrganization } from '../user-organization/user-organization.entity';
import { UserOrganizationService } from '../user-organization/user-organization.services';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { CommandHandlers } from './commands/handlers';
import { OrganizationController } from './organization.controller';
import { Organization } from './organization.entity';
import { OrganizationService } from './organization.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Organization, User, UserOrganization, Role]),
		CqrsModule,
		TenantModule
	],
	controllers: [OrganizationController],
	providers: [
		OrganizationService,
		UserService,
		UserOrganizationService,
		RoleService,
		...CommandHandlers
	],
	exports: [OrganizationService]
})
export class OrganizationModule {}
