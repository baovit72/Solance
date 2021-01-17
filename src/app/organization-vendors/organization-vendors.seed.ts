import { OrganizationVendorEnum, IOrganization } from '@gauzy/models';
import { Connection } from 'typeorm';
import { OrganizationVendor } from './organization-vendors.entity';
import { Tenant } from '../tenant/tenant.entity';

export const createOrganizationVendors = async (
	connection: Connection,
	organizations: IOrganization[]
): Promise<OrganizationVendor[]> => {
	let defaultOrganizationVendors: OrganizationVendor[] = [];

	organizations.forEach((organization) => {
		const vendors = Object.values(OrganizationVendorEnum).map((name) => ({
			name,
			organizationId: organization.id,
			organization,
			tenant: organization.tenant
		}));

		defaultOrganizationVendors = [
			...defaultOrganizationVendors,
			...vendors
		];
	});

	insertOrganizationVendors(connection, defaultOrganizationVendors);

	return defaultOrganizationVendors;
};

export const createRandomOrganizationVendors = async (
	connection: Connection,
	tenants: Tenant[],
	tenantOrganizationsMap: Map<Tenant, IOrganization[]>
): Promise<Map<IOrganization, OrganizationVendor[]>> => {
	let organizationVendors: OrganizationVendor[] = [];
	const organizationVendorsMap: Map<
		IOrganization,
		OrganizationVendor[]
	> = new Map();

	(tenants || []).forEach((tenant) => {
		const organizations = tenantOrganizationsMap.get(tenant);

		(organizations || []).forEach((organization) => {
			const vendors = Object.values(OrganizationVendorEnum).map(
				(name) => ({
					name,
					organization,
					organizationId: organization.id,
					tenant: organization.tenant
				})
			);

			organizationVendorsMap.set(organization, vendors);
			organizationVendors = [...organizationVendors, ...vendors];
		});
	});

	await insertOrganizationVendors(connection, organizationVendors);

	return organizationVendorsMap;
};

const insertOrganizationVendors = async (
	connection: Connection,
	organizationVendors: OrganizationVendor[]
) => {
	await connection
		.createQueryBuilder()
		.insert()
		.into(OrganizationVendor)
		.values(organizationVendors)
		.execute();
};
