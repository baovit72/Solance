import { Entity, Index, Column, ManyToMany, JoinTable } from 'typeorm';
import { ITimeOffPolicy } from '@gauzy/models';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { Employee } from '../employee/employee.entity';
import { TenantOrganizationBase } from '../core/entities/tenant-organization-base';

@Entity('time_off_policy')
export class TimeOffPolicy extends TenantOrganizationBase
	implements ITimeOffPolicy {
	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	@Index()
	@Column()
	name: string;

	@ApiProperty({ type: Boolean })
	@IsBoolean()
	@Column()
	requiresApproval: boolean;

	@ApiProperty({ type: Boolean })
	@IsBoolean()
	@Column()
	paid: boolean;

	@ManyToMany((type) => Employee, { cascade: ['update'] })
	@JoinTable({
		name: 'time_off_policy_employee'
	})
	employees?: Employee[];
}
