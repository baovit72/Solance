import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IHelpCenterArticle } from '@gauzy/models';
import { TenantOrganizationBase } from '../core/entities/tenant-organization-base';

@Entity('knowledge_base_article')
export class HelpCenterArticle extends TenantOrganizationBase
	implements IHelpCenterArticle {
	@ApiProperty({ type: String })
	@Column()
	name: string;

	@ApiProperty({ type: String })
	@Column()
	description: string;

	@ApiProperty({ type: String })
	@Column()
	data: string;

	@ApiProperty({ type: String })
	@Column()
	categoryId: string;

	@ApiProperty({ type: Boolean })
	@Column()
	draft: boolean;

	@ApiProperty({ type: Boolean })
	@Column()
	privacy: boolean;

	@ApiProperty({ type: Number })
	@Column()
	index: number;
}
