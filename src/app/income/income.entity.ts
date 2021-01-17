import {
	Column,
	Entity,
	Index,
	JoinColumn,
	RelationId,
	ManyToOne,
	ManyToMany,
	JoinTable
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsString,
	IsNumber,
	IsOptional,
	IsDate,
	IsEnum,
	IsBoolean
} from 'class-validator';
import { IIncome, CurrenciesEnum } from '@gauzy/models';
import { Employee } from '../employee/employee.entity';
import { Tag } from '../tags/tag.entity';
import { TenantOrganizationBase } from '../core/entities/tenant-organization-base';

@Entity('income')
export class Income extends TenantOrganizationBase implements IIncome {
	@ManyToMany((type) => Tag, (tag) => tag.income)
	@JoinTable({
		name: 'tag_income'
	})
	tags: Tag[];

	@ApiProperty({ type: Employee })
	@ManyToOne((type) => Employee, { nullable: true, onDelete: 'CASCADE' })
	@JoinColumn()
	employee: Employee;

	@ApiProperty({ type: String, readOnly: true })
	@RelationId((income: Income) => income.employee)
	@Column({ nullable: true })
	readonly employeeId?: string;

	@ApiProperty({ type: Number })
	@IsNumber()
	@IsNotEmpty()
	@Index()
	@Column({ type: 'numeric' })
	amount: number;

	@ApiPropertyOptional({ type: String })
	@Index()
	@IsOptional()
	@Column({ nullable: true })
	clientId?: string;

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	@Index()
	@Column()
	clientName: string;

	@ApiProperty({ type: String, enum: CurrenciesEnum })
	@IsEnum(CurrenciesEnum)
	@IsNotEmpty()
	@Index()
	@Column()
	currency: string;

	@ApiPropertyOptional({ type: Date })
	@IsDate()
	@IsOptional()
	@Column({ nullable: true })
	valueDate?: Date;

	@ApiPropertyOptional({ type: String })
	@Index()
	@IsOptional()
	@Column({ nullable: true })
	notes?: string;

	@ApiProperty({ type: Boolean })
	@IsBoolean()
	@IsOptional()
	@Column({ nullable: true })
	isBonus: boolean;

	@ApiPropertyOptional({ type: String, maxLength: 256 })
	@IsOptional()
	@Column({ nullable: true })
	reference?: string;
}
