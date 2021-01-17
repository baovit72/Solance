import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { IIntegrationTenant } from '@gauzy/models';
import { IntegrationEntitySetting } from '../integration-entity-setting/integration-entity-setting.entity';
import { TenantOrganizationBase } from '../core/entities/tenant-organization-base';

@Entity('integration_tenant')
export class IntegrationTenant
	extends TenantOrganizationBase
	implements IIntegrationTenant {
	@ApiPropertyOptional({ type: IntegrationEntitySetting, isArray: true })
	@OneToMany(
		(type) => IntegrationEntitySetting,
		(setting) => setting.integration
	)
	@JoinColumn()
	entitySettings?: IntegrationEntitySetting[];

	@ApiProperty({ type: String })
	@Column({ nullable: false })
	name: string;
}
