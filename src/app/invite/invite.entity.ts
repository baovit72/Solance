import {
	IInvite,
	InviteStatusEnum,
	IOrganizationDepartment,
	IOrganizationContact,
	IOrganizationProject,
	IUser,
	IRole
} from '@gauzy/models';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import {
	Column,
	Entity,
	Index,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	RelationId
} from 'typeorm';
import { OrganizationProject } from '../organization-projects/organization-projects.entity';
import { Role } from '../role/role.entity';
import { User } from '../user/user.entity';
import { OrganizationContact } from '../organization-contact/organization-contact.entity';
import { OrganizationDepartment } from '../organization-department/organization-department.entity';
import { TenantOrganizationBase } from '../core/entities/tenant-organization-base';

@Entity('invite')
export class Invite extends TenantOrganizationBase implements IInvite {
	@ApiPropertyOptional({ type: String })
	@IsString()
	@Index({ unique: true })
	@Column()
	token: string;

	@ApiProperty({ type: String, minLength: 3, maxLength: 100 })
	@IsEmail()
	@IsNotEmpty()
	@Index({ unique: true })
	@Column()
	email: string;

	@ApiProperty({ type: String })
	@RelationId((invite: Invite) => invite.role)
	@Column()
	roleId: string;

	@ApiProperty({ type: String })
	@RelationId((invite: Invite) => invite.invitedBy)
	@Column()
	invitedById: string;

	@ApiProperty({ type: String, enum: InviteStatusEnum })
	@IsEnum(InviteStatusEnum)
	@IsNotEmpty()
	@Column()
	status: string;

	@ApiPropertyOptional({ type: Date })
	@IsDate()
	@Column()
	expireDate: Date;

	@ApiPropertyOptional({ type: Role })
	@ManyToOne((type) => Role, { nullable: true, onDelete: 'CASCADE' })
	@JoinColumn()
	role?: IRole;

	@ApiPropertyOptional({ type: User })
	@ManyToOne((type) => User, { nullable: true, onDelete: 'CASCADE' })
	@JoinColumn()
	invitedBy?: IUser;

	@ManyToMany((type) => OrganizationProject)
	@JoinTable({
		name: 'invite_organization_project'
	})
	projects?: IOrganizationProject[];

	@ManyToMany((type) => OrganizationContact)
	@JoinTable({
		name: 'invite_organization_contact'
	})
	organizationContact?: IOrganizationContact[];

	@ManyToMany((type) => OrganizationDepartment)
	@JoinTable({
		name: 'invite_organization_department'
	})
	departments?: IOrganizationDepartment[];
}
