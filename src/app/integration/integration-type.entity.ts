import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { IIntegrationType } from '@gauzy/models';
import { Base } from '../core/entities/base';
@Entity('integration_type')
export class IntegrationType extends Base implements IIntegrationType {
	@ApiProperty({ type: String })
	@Column({ nullable: false })
	name: string;

	@ApiProperty({ type: String })
	@Column({ nullable: false })
	groupName: string;

	@ApiProperty({ type: Number })
	@Column({ nullable: false })
	order: number;
}
