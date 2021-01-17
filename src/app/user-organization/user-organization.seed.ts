import { Connection } from 'typeorm';
import {
	IOrganization,
	IUser,
	IUserOrganization,
	ISeedUsers
} from '@gauzy/models';
import { UserOrganization } from './user-organization.entity';
import { Tenant } from '../tenant/tenant.entity';

export const createDefaultUsersOrganizations = async (
	connection: Connection,
	defaultData: {
		organizations: IOrganization[];
		users: IUser[];
	}
): Promise<IUserOrganization[]> => {
	let userOrganization: IUserOrganization;

	const usersOrganizations: IUserOrganization[] = [];
	const defaultUsers = defaultData.users;
	const defaultOrgs = defaultData.organizations;

	defaultOrgs.forEach((org) => {
		for (const user of defaultUsers) {
			userOrganization = new UserOrganization();
			userOrganization.organizationId = org.id;
			userOrganization.tenant = org.tenant;
			userOrganization.userId = user.id;
			usersOrganizations.push(userOrganization);
		}
	});
	return await insertUserOrganization(connection, usersOrganizations);
};

export const createRandomUsersOrganizations = async (
	connection: Connection,
	tenants: Tenant[],
	tenantOrganizationsMap: Map<Tenant, IOrganization[]>,
	tenantSuperAdminsMap: Map<Tenant, IUser[]>,
	tenantUsersMap: Map<Tenant, ISeedUsers>,
	employeesPerOrganization: number
): Promise<IUserOrganization[]> => {
	const usersOrganizations: IUserOrganization[] = [];

	for (const tenant of tenants) {
		const orgs = tenantOrganizationsMap.get(tenant);
		const superAdmins = tenantSuperAdminsMap.get(tenant);
		const { adminUsers, employeeUsers } = tenantUsersMap.get(tenant);

		let start = 0;
		let end: number = employeesPerOrganization;

		let count = 0;

		orgs.forEach((org) => {
			const userList = [
				...employeeUsers.slice(start, end),
				adminUsers[count % adminUsers.length],
				...superAdmins
			];
			start = end;
			end = end + employeesPerOrganization;
			count++;

			userList.forEach(async (user) => {
				if (user.id) {
					const userOrganization = new UserOrganization();
					userOrganization.organizationId = org.id;
					userOrganization.userId = user.id;
					userOrganization.tenant = org.tenant;
					usersOrganizations.push(userOrganization);
				}
			});
		});
	}

	return await insertUserOrganization(connection, usersOrganizations);
};

const insertUserOrganization = async (
	connection: Connection,
	userOrganizations: IUserOrganization[]
): Promise<IUserOrganization[]> => {
	return await connection.manager.save(userOrganizations);
};
