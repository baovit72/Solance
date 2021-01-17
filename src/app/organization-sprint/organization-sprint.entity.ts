import { Entity, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { IOrganizationSprint, SprintStartDayEnum } from '@gauzy/models';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsBoolean,
	IsDate,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString
} from 'class-validator';
import { Task } from '../tasks/task.entity';
import { OrganizationProject } from '../organization-projects/organization-projects.entity';
import { TenantOrganizationBase } from '../core/entities/tenant-organization-base';

@Entity('organization_sprint')
export class OrganizationSprint extends TenantOrganizationBase
	implements IOrganizationSprint {
	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	@Column()
	name: string;

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	@Column()
	projectId: string;

	@ApiProperty({ type: String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	goal?: string;

	@ApiProperty({ type: Number })
	@IsNumber()
	@Column({ default: 7 })
	length: number;

	@ApiPropertyOptional({ type: Date })
	@IsDate()
	@IsOptional()
	@Column({ nullable: true })
	startDate?: Date;

	@ApiPropertyOptional({ type: Date })
	@IsDate()
	@IsOptional()
	@Column({ nullable: true })
	endDate?: Date;

	@ApiProperty({ type: Number, enum: SprintStartDayEnum })
	@IsNumber()
	@Column({ nullable: true })
	dayStart?: number;

	@ApiProperty({ type: OrganizationProject })
	@ManyToOne(
		(type) => OrganizationProject,
		(project) => project.organizationSprints,
		{
			nullable: true,
			onDelete: 'CASCADE'
		}
	)
	@JoinColumn()
	project?: OrganizationProject;

	@ApiProperty({ type: Boolean })
	@IsBoolean()
	@Column({ nullable: true })
	isActive?: boolean;

	@ApiProperty({ type: Task })
	@OneToMany((type) => Task, (task) => task.organizationSprint)
	@JoinColumn()
	tasks?: Task[];
}
