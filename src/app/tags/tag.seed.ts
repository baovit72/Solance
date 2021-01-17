import { Connection } from 'typeorm';
import * as faker from 'faker';
import { Tag } from './tag.entity';
import { Tenant } from '../tenant/tenant.entity';
import { Organization } from '../organization/organization.entity';
import { DEFAULT_GLOBAL_TAGS, DEFAULT_ORGANIZATION_TAGS } from './default-tags';

export const createDefaultTags = async (
	connection: Connection,
	tenant: Tenant,
	organizations: Organization[]
): Promise<Tag[]> => {
	let tags: Tag[] = [];

	organizations.forEach((org) => {
		const organizationTags: Tag[] = Object.values(DEFAULT_GLOBAL_TAGS).map(
			(name) => {
				const orgTags = new Tag();
				orgTags.name = name;
				orgTags.description = '';
				orgTags.color = faker.commerce.color();
				if (orgTags.color === 'white') {
					orgTags.color = 'Red';
				}
				orgTags.organization = org;
				orgTags.tenant = tenant;
				return orgTags;
			}
		);
		tags = [...tags, ...organizationTags];
	});
	return await connection.manager.save(tags);
};

export const createTags = async (connection: Connection): Promise<Tag[]> => {
	const tags: Tag[] = [];
	for (const name of DEFAULT_ORGANIZATION_TAGS) {
		const tag = new Tag();
		tag.name = name;
		tag.description = '';
		tag.color = faker.commerce.color();
		if (tag.color === 'white') {
			tag.color = 'red';
		}
		tags.push(tag);
	}

	await connection
		.createQueryBuilder()
		.insert()
		.into(Tag)
		.values(tags)
		.execute();

	return tags;
};

export const createRandomOrganizationTags = async (
	connection: Connection,
	tenants: Tenant[],
	tenantOrganizationsMap: Map<Tenant, Organization[]>
): Promise<Tag[]> => {
	let tags: Tag[] = [];

	for (const tenant of tenants) {
		const organizations = tenantOrganizationsMap.get(tenant);
		organizations.forEach((org) => {
			const organizationTags: Tag[] = Object.values(
				DEFAULT_ORGANIZATION_TAGS
			).map((name) => {
				const orgTags = new Tag();
				orgTags.name = name;
				orgTags.description = '';
				orgTags.color = faker.commerce.color();
				orgTags.organization = org;
				orgTags.tenant = tenant;

				if (orgTags.color === 'white') {
					orgTags.color = 'red';
				}

				return orgTags;
			});
			tags = [...tags, ...organizationTags];
		});
	}
	return await connection.manager.save(tags);
};
