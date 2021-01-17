import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IKPI, KpiMetricEnum } from '@gauzy/models';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Employee } from '../employee/employee.entity';
import { TenantOrganizationBase } from '../core/entities/tenant-organization-base';

@Entity('goal_kpi')
export class GoalKPI extends TenantOrganizationBase implements IKPI {
	@ApiProperty({ type: String })
	@Column()
	name: string;

	@ApiProperty({ type: String })
	@Column()
	description: string;

	@ApiProperty({ type: String, enum: KpiMetricEnum })
	@Column()
	@IsEnum(KpiMetricEnum)
	type: string;

	@ApiProperty({ type: String })
	@Column({ nullable: true })
	@IsOptional()
	unit?: string;

	@ApiProperty({ type: String })
	@Column()
	operator: string;

	@ApiProperty({ type: Employee })
	@ManyToOne((type) => Employee, { nullable: true })
	@JoinColumn()
	@IsOptional()
	lead: Employee;

	@ApiProperty({ type: Number })
	@Column()
	currentValue: number;

	@ApiProperty({ type: Number })
	@Column()
	targetValue: number;
}
