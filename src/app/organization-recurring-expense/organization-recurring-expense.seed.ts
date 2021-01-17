import { Connection } from 'typeorm';
import { OrganizationRecurringExpense } from './organization-recurring-expense.entity';
import * as faker from 'faker';
import { Tenant } from '../tenant/tenant.entity';
import {
	IOrganization,
	RecurringExpenseDefaultCategoriesEnum
} from '@gauzy/models';
import * as moment from 'moment';
import { Organization } from '../organization/organization.entity';
import { environment as env } from '@env-api/environment';

export const createDefaultOrganizationRecurringExpense = async (
	connection: Connection,
	tenant: Tenant,
	defaultOrganizations: Organization
): Promise<OrganizationRecurringExpense[]> => {
	if (!defaultOrganizations) {
		console.warn(
			'Warning: defaultOrganizations not found, default organization recurring expense not be created'
		);
		return;
	}

	let mapOrganizationRecurringExpense: OrganizationRecurringExpense[] = [];
	const expenseCategories = Object.keys(
		RecurringExpenseDefaultCategoriesEnum
	);

	mapOrganizationRecurringExpense = await dataOperation(
		connection,
		tenant,
		mapOrganizationRecurringExpense,
		expenseCategories,
		defaultOrganizations
	);
	return mapOrganizationRecurringExpense;
};

export const createRandomOrganizationRecurringExpense = async (
	connection: Connection,
	tenants: Tenant[],
	tenantOrganizationsMap: Map<Tenant, IOrganization[]>
): Promise<OrganizationRecurringExpense[]> => {
	if (!tenantOrganizationsMap) {
		console.warn(
			'Warning: tenantOrganizationsMap not found, organization recurring expense not be created'
		);
		return;
	}

	let mapOrganizationRecurringExpense: OrganizationRecurringExpense[] = [];
	const expenseCategories = Object.keys(
		RecurringExpenseDefaultCategoriesEnum
	);

	for (const tenant of tenants) {
		const tenantOrganization = tenantOrganizationsMap.get(tenant);
		for (const tenantOrg of tenantOrganization) {
			mapOrganizationRecurringExpense = await dataOperation(
				connection,
				tenant,
				mapOrganizationRecurringExpense,
				expenseCategories,
				tenantOrg
			);
		}
	}

	return mapOrganizationRecurringExpense;
};

const dataOperation = async (
	connection: Connection,
	tenant: Tenant,
	mapOrganizationRecurringExpense,
	expenseCategories,
	tenantOrg: Organization
) => {
	for (const expenseCategory of expenseCategories) {
		const organization = new OrganizationRecurringExpense();

		const startDate = faker.date.past();
		const endDate = moment(startDate).add(1, 'months').toDate();

		organization.organization = tenantOrg;
		organization.organizationId = tenantOrg.id;
		organization.tenant = tenant;

		organization.startDay = startDate.getDate();
		organization.startMonth = startDate.getMonth() + 1;
		organization.startYear = startDate.getFullYear();
		organization.startDate = startDate;

		organization.endDay = endDate.getDate();
		organization.endMonth = endDate.getMonth();
		organization.endYear = endDate.getFullYear();
		organization.endDate = endDate;

		organization.categoryName = expenseCategory;
		organization.value = faker.random.number(9999);

		organization.currency = tenantOrg.currency || env.defaultCurrency;

		mapOrganizationRecurringExpense.push(organization);
	}
	await connection.manager.save(mapOrganizationRecurringExpense);
	return mapOrganizationRecurringExpense;
};
