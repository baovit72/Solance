import { Connection } from 'typeorm';
import { OrganizationDepartment } from './organization-department.entity';
import * as faker from 'faker';
import { Tenant } from '../tenant/tenant.entity';
import { Organization } from '../organization/organization.entity';
import { Tag } from '../tags/tag.entity';
import { DEFAULT_ORGANIZATION_DEPARTMENTS } from './default-organization-departments';

export const createDefaultOrganizationDepartments = async (
	connection: Connection,
	defaultOrganizations: Organization[]
) => {
	const tag = await connection.getRepository(Tag).create({
		name: 'API',
		description: '',
		color: faker.commerce.color()
	});
	const departments: OrganizationDepartment[] = [];

	for (const defaultOrganization of defaultOrganizations) {
		DEFAULT_ORGANIZATION_DEPARTMENTS.forEach((name) => {
			const department = new OrganizationDepartment();
			department.tags = [tag];
			department.name = name;
			department.organizationId = defaultOrganization.id;
			department.tenant = defaultOrganization.tenant;
			departments.push(department);
		});
	}
	return await connection.manager.save(departments);
};

export const seedRandomOrganizationDepartments = async (
	connection: Connection,
	tenants: Tenant[],
	tenantOrganizationsMap: Map<Tenant, Organization[]>
): Promise<void> => {
	let departments: OrganizationDepartment[] = [];

	for (const tenant of tenants) {
		const organizations = tenantOrganizationsMap.get(tenant);
		organizations.forEach(({ id: organizationId }) => {
			const organizationDepartments: OrganizationDepartment[] = DEFAULT_ORGANIZATION_DEPARTMENTS.map(
				(name) => {
					const employmentDepartment = new OrganizationDepartment();
					employmentDepartment.name = name;
					employmentDepartment.organizationId = organizationId;
					employmentDepartment.tenant = tenant;
					return employmentDepartment;
				}
			);
			departments = [...departments, ...organizationDepartments];
		});
		await insertEmploymentDepartment(connection, departments);
	}
};

const insertEmploymentDepartment = async (
	connection: Connection,
	employmentDepartment: OrganizationDepartment[]
): Promise<void> => {
	await connection.manager.save(employmentDepartment);
};
