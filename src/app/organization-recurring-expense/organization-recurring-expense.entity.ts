import { CurrenciesEnum, IOrganizationRecurringExpense } from '@gauzy/models';
import { ApiProperty } from '@nestjs/swagger';
import {
	IsDate,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Max,
	Min,
	IsBoolean
} from 'class-validator';
import { Column, Entity, Index } from 'typeorm';
import { TenantOrganizationBase } from '../core/entities/tenant-organization-base';

@Entity('organization_recurring_expense')
export class OrganizationRecurringExpense extends TenantOrganizationBase
	implements IOrganizationRecurringExpense {
	@ApiProperty({ type: Number, minimum: 1, maximum: 31 })
	@IsNumber()
	@IsNotEmpty()
	@Min(1)
	@Max(31)
	@Column()
	startDay: number;

	@ApiProperty({ type: Number, minimum: 1, maximum: 12 })
	@IsNumber()
	@IsNotEmpty()
	@Min(1)
	@Max(12)
	@Column()
	startMonth: number;

	@ApiProperty({ type: Number, minimum: 1 })
	@IsNumber()
	@IsNotEmpty()
	@Min(0)
	@Column()
	startYear: number;

	@ApiProperty({ type: Date })
	@IsDate()
	@Column()
	startDate: Date;

	@ApiProperty({ type: Number, minimum: 1, maximum: 31 })
	@IsNumber()
	@IsOptional()
	@Min(1)
	@Max(31)
	@Column({ nullable: true })
	endDay: number;

	@ApiProperty({ type: Number, minimum: 1, maximum: 12 })
	@IsNumber()
	@IsOptional()
	@Min(1)
	@Max(12)
	@Column({ nullable: true })
	endMonth: number;

	@ApiProperty({ type: Number, minimum: 1 })
	@IsNumber()
	@IsOptional()
	@Min(0)
	@Column({ nullable: true })
	endYear: number;

	@ApiProperty({ type: Date })
	@IsDate()
	@IsOptional()
	@Column({ nullable: true })
	endDate?: Date;

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	@Index()
	@Column()
	categoryName: string;

	@ApiProperty({ type: Number })
	@IsNumber()
	@IsNotEmpty()
	@Column({ type: 'numeric' })
	value: number;

	@ApiProperty({ type: String, enum: CurrenciesEnum })
	@IsEnum(CurrenciesEnum)
	@IsNotEmpty()
	@Index()
	@Column()
	currency: string;

	@ApiProperty({ type: Boolean })
	@IsBoolean()
	@IsOptional()
	@Column({ nullable: true })
	splitExpense: boolean;

	@ApiProperty({ type: String })
	@IsString()
	@Index()
	@Column({ nullable: true })
	parentRecurringExpenseId?: string;
}
