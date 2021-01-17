// Modified code from https://github.com/alexitaylor/angular-graphql-nestjs-postgres-starter-kit.
// MIT License, see https://github.com/alexitaylor/angular-graphql-nestjs-postgres-starter-kit/blob/master/LICENSE
// Copyright (c) 2019 Alexi Taylor

import { Connection } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { environment as env } from '@env-api/environment';
import * as faker from 'faker';
import {
	IDefaultUser,
	RolesEnum,
	ISeedUsers,
	LanguagesEnum,
	IRole
} from '@gauzy/models';
import { Role } from '../role/role.entity';
import { User } from './user.entity';
import { getUserDummyImage } from '../core';
import { Tenant } from '../tenant/tenant.entity';
import { DEFAULT_EMPLOYEES } from '../employee/default-employees';
import { DEFAULT_CANDIDATES } from '../candidate/default-candidates';
import { DEFAULT_SUPER_ADMINS, DEFAULT_ADMINS } from './default-users';

export const createDefaultSuperAdminUsers = async (
	connection: Connection,
	roles: Role[],
	tenant: Tenant
): Promise<User[]> => {
	const superAdmins: User[] = [];
	const superAdminRole = roles.find(
		(role) => role.name === RolesEnum.SUPER_ADMIN
	);

	// Generate default super admins
	for (const superAdmin of DEFAULT_SUPER_ADMINS) {
		const superAdminUser: User = await generateDefaultUser(
			superAdmin,
			superAdminRole,
			tenant
		);
		superAdmins.push(superAdminUser);
	}

	return await insertUsers(connection, superAdmins);
};

export const createRandomSuperAdminUsers = async (
	connection: Connection,
	roles: Role[],
	tenants: Tenant[],
	noOfSuperAdmins: number = 1
): Promise<Map<Tenant, User[]>> => {
	const superAdminRole = roles.find(
		(role) => role.name === RolesEnum.SUPER_ADMIN
	);

	const tenantSuperAdminsMap: Map<Tenant, User[]> = new Map();

	const superAdmins: User[] = [];

	for (const tenant of tenants) {
		const tenantSuperAdmins = [];
		// Generate random super admins
		for (let i = 0; i < noOfSuperAdmins; i++) {
			const superAdminUser = await generateRandomUser(
				superAdminRole,
				tenant
			);
			tenantSuperAdmins.push(superAdminUser);
			superAdmins.push(superAdminUser);
		}
		tenantSuperAdminsMap.set(tenant, tenantSuperAdmins);
	}

	await insertUsers(connection, superAdmins);
	return tenantSuperAdminsMap;
};

export const createDefaultUsers = async (
	connection: Connection,
	roles: Role[],
	tenant: Tenant
): Promise<{
	adminUsers: User[];
	defaultEmployeeUsers: User[];
	defaultCandidateUsers: User[];
}> => {
	const _adminUsers: Promise<User[]> = seedAdminUsers(roles, tenant);

	const _defaultEmployeeUsers: Promise<User[]> = seedDefaultEmployeeUsers(
		roles,
		tenant
	);

	const _defaultCandidateUsers: Promise<User[]> = seedDefaultCandidateUsers(
		roles,
		tenant
	);

	const [
		adminUsers,
		defaultEmployeeUsers,
		defaultCandidateUsers
	] = await Promise.all([
		_adminUsers,
		_defaultEmployeeUsers,
		_defaultCandidateUsers
	]);

	await insertUsers(connection, [
		...adminUsers,
		...defaultEmployeeUsers,
		...defaultCandidateUsers
	]);

	return {
		adminUsers,
		defaultEmployeeUsers,
		defaultCandidateUsers
	};
};

export const createRandomUsers = async (
	connection: Connection,
	roles: Role[],
	tenants: Tenant[],
	organizationPerTenant: number,
	employeesPerOrganization: number,
	candidatesPerOrganization: number,
	managersPerOrganization: number,
	dataEntriesPerOrganization: number,
	viewerPerOrganization: number
): Promise<Map<Tenant, ISeedUsers>> => {
	const randomTenantUsers: Map<Tenant, ISeedUsers> = new Map();

	for (const tenant of tenants) {
		const _adminUsers: Promise<User[]> = seedRandomUsers(
			RolesEnum.ADMIN,
			roles,
			tenant,
			organizationPerTenant //Because we want to seed at least one admin per organization
		);

		const _employeeUsers: Promise<User[]> = seedRandomUsers(
			RolesEnum.EMPLOYEE,
			roles,
			tenant,
			employeesPerOrganization * organizationPerTenant
		);

		const _candidateUsers: Promise<User[]> = seedRandomUsers(
			RolesEnum.CANDIDATE,
			roles,
			tenant,
			candidatesPerOrganization * organizationPerTenant
		);

		const _managerUsers: Promise<User[]> = seedRandomUsers(
			RolesEnum.MANAGER,
			roles,
			tenant,
			managersPerOrganization * organizationPerTenant
		);

		const _dataEntryUsers: Promise<User[]> = seedRandomUsers(
			RolesEnum.DATA_ENTRY,
			roles,
			tenant,
			dataEntriesPerOrganization * organizationPerTenant
		);

		const _viewerUsers: Promise<User[]> = seedRandomUsers(
			RolesEnum.VIEWER,
			roles,
			tenant,
			viewerPerOrganization * organizationPerTenant
		);

		const [
			promiseAdminUsers,
			promiseEmployeeUsers,
			promiseCandidateUsers,
			promiseManagerUsers,
			promiseDataEntryUsers,
			promiseViewerUsers
		] = await Promise.all([
			_adminUsers,
			_employeeUsers,
			_candidateUsers,
			_managerUsers,
			_dataEntryUsers,
			_viewerUsers
		]);

		const adminUsers = await insertUsers(connection, [
			...promiseAdminUsers
		]);
		const employeeUsers = await insertUsers(connection, [
			...promiseEmployeeUsers
		]);
		const candidateUsers = await insertUsers(connection, [
			...promiseCandidateUsers
		]);

		await insertUsers(connection, [
			...promiseManagerUsers,
			...promiseDataEntryUsers,
			...promiseViewerUsers
		]);

		randomTenantUsers.set(tenant, {
			adminUsers,
			employeeUsers,
			candidateUsers
		});
	}

	return randomTenantUsers;
};

const seedAdminUsers = async (
	roles: Role[],
	tenant: Tenant
): Promise<User[]> => {
	const adminRole = roles.find(
		(role: IRole) => role.name === RolesEnum.ADMIN
	);
	const admins: Promise<User>[] = [];
	let adminUser: Promise<User>;
	// Generate default admins
	for (const admin of DEFAULT_ADMINS) {
		adminUser = generateDefaultUser(admin, adminRole, tenant);
		admins.push(adminUser);
	}

	return Promise.all(admins);
};

const seedDefaultEmployeeUsers = async (
	roles: Role[],
	tenant: Tenant
): Promise<User[]> => {
	const employeeRole = roles.find(
		(role: IRole) => role.name === RolesEnum.EMPLOYEE
	);
	const defaultEmployees = DEFAULT_EMPLOYEES;
	const defaultUsers: Promise<User>[] = [];

	let user: Promise<User>;
	// Generate default users
	for (const employee of defaultEmployees) {
		user = generateDefaultUser(employee, employeeRole, tenant);
		defaultUsers.push(user);
	}

	return Promise.all(defaultUsers);
};

const seedRandomUsers = async (
	roleEnum: RolesEnum,
	roles: Role[],
	tenant: Tenant,
	maxUserCount: number
): Promise<User[]> => {
	const role = roles.find(({ name }) => name === roleEnum);
	const randomUsers: Promise<User>[] = [];
	let user: Promise<User>;

	// Generate 50 random users
	for (let i = 0; i < maxUserCount; i++) {
		user = generateRandomUser(role, tenant);
		randomUsers.push(user);
	}
	return Promise.all(randomUsers);
};

const seedDefaultCandidateUsers = async (
	roles: Role[],
	tenant: Tenant
): Promise<User[]> => {
	const candidateRole = roles.find(
		(role: IRole) => role.name === RolesEnum.CANDIDATE
	);
	const defaultCandidates = DEFAULT_CANDIDATES;
	const defaultCandidateUsers: Promise<User>[] = [];
	let user: Promise<User>;

	// Generate default candidate users
	for (const candidate of defaultCandidates) {
		user = generateDefaultUser(candidate, candidateRole, tenant);
		defaultCandidateUsers.push(user);
	}

	return Promise.all(defaultCandidateUsers);
};

const generateDefaultUser = async (
	defaultUser: IDefaultUser,
	role: Role,
	tenant: Tenant
): Promise<User> => {
	const user = new User();
	const {
		firstName,
		lastName,
		email,
		imageUrl,
		preferredLanguage
	} = defaultUser;

	user.email = email;
	user.firstName = firstName;
	user.lastName = lastName;
	user.role = role;
	user.imageUrl = getUserDummyImage(user);
	user.imageUrl = imageUrl;
	user.tenant = tenant;
	user.preferredLanguage = preferredLanguage;

	user.hash = await bcrypt.hash(
		defaultUser.password,
		env.USER_PASSWORD_BCRYPT_SALT_ROUNDS
	);

	return user;
};

const generateRandomUser = async (
	role: Role,
	tenant: Tenant
): Promise<User> => {
	const gender = faker.random.number(1);
	const firstName = faker.name.firstName(gender);
	const lastName = faker.name.lastName(gender);
	const username = faker.internet.userName(firstName, lastName);
	const email = faker.internet.email(firstName, lastName);
	const avatar = faker.image.avatar();

	const user = new User();
	user.firstName = firstName;
	user.lastName = lastName;
	user.username = username;
	user.email = email;
	user.role = role;
	user.imageUrl = avatar;
	user.tenant = tenant;

	const languages = Object.values(LanguagesEnum);
	user.preferredLanguage =
		languages[Math.floor(Math.random() * languages.length)];

	user.hash = await bcrypt.hash(
		'123456',
		env.USER_PASSWORD_BCRYPT_SALT_ROUNDS
	);

	return user;
};

const insertUsers = async (
	connection: Connection,
	users: User[]
): Promise<User[]> => {
	return await connection.manager.save(users);
};
