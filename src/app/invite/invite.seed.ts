import { Connection } from 'typeorm';
import { Invite } from './invite.entity';
import { Tenant } from '../tenant/tenant.entity';
import { Organization } from '../organization/organization.entity';
import * as faker from 'faker';
import { InviteStatusEnum, RolesEnum } from '@gauzy/models';
import { Role } from '../role/role.entity';
import { sign } from 'jsonwebtoken';
import { environment as env } from '@env-api/environment';
import { User } from '../user/user.entity';
import * as moment from 'moment';

export const createDefaultEmployeeInviteSent = async (
	connection: Connection,
	tenant: Tenant,
	organizations: Organization[],
	SuperAdmin: User[]
): Promise<any> => {
	const totalInvites: Invite[] = [];
	const invitationStatus = Object.values(InviteStatusEnum);

	const employeeRole = await connection.getRepository(Role).find({
		where: [{ tenant: tenant, name: RolesEnum.EMPLOYEE }]
	});
	const candidateRole = await connection.getRepository(Role).find({
		where: [{ tenant: tenant, name: RolesEnum.CANDIDATE }]
	});
	organizations.forEach((org) => {
		for (let i = 0; i < 10; i++) {
			const invitee = new Invite();
			invitee.email = faker.internet.email();
			invitee.expireDate = faker.date.between(
				new Date(),
				moment(new Date()).add(30, 'days').toDate()
			);
			invitee.invitedBy = faker.random.arrayElement(SuperAdmin);
			invitee.organizationId = org.id;
			invitee.organization = org;
			invitee.role = faker.random.arrayElement([
				employeeRole[0],
				candidateRole[0]
			]);
			invitee.status = faker.random.arrayElement(invitationStatus);
			invitee.token = createToken(invitee.email);
			invitee.tenant = tenant;
			totalInvites.push(invitee);
		}
	});
	await connection.manager.save(totalInvites);
};

export const createRandomEmployeeInviteSent = async (
	connection: Connection,
	tenants: Tenant[],
	tenantOrganizationsMap: Map<Tenant, Organization[]>,
	tenantSuperAdminMap: Map<Tenant, User[]>,
	noOfInvitesPerOrganization: number
): Promise<any> => {
	const totalInvites: Invite[] = [];
	const invitationStatus = Object.values(InviteStatusEnum);

	for (const tenant of tenants) {
		const employeeRole = await connection.getRepository(Role).find({
			where: [{ tenant: tenant, name: RolesEnum.EMPLOYEE }]
		});
		const candidateRole = await connection.getRepository(Role).find({
			where: [{ tenant: tenant, name: RolesEnum.CANDIDATE }]
		});
		const orgs = tenantOrganizationsMap.get(tenant);
		const admins = tenantSuperAdminMap.get(tenant);
		orgs.forEach((org) => {
			for (let i = 0; i < noOfInvitesPerOrganization; i++) {
				const invitee = new Invite();
				invitee.email = faker.internet.email();
				invitee.expireDate = faker.date.between(
					new Date(),
					moment(new Date()).add(30, 'days').toDate()
				);
				invitee.invitedBy = faker.random.arrayElement(admins);
				invitee.organizationId = org.id;
				invitee.organization = org;
				invitee.role = faker.random.arrayElement([
					employeeRole[0],
					candidateRole[0]
				]);
				invitee.status = faker.random.arrayElement(invitationStatus);
				invitee.token = createToken(invitee.email);
				invitee.tenant = tenant;
				totalInvites.push(invitee);
			}
		});
	}
	await connection.manager.save(totalInvites);
};

function createToken(email): string {
	const token: string = sign({ email }, env.JWT_SECRET, {});
	return token;
}
