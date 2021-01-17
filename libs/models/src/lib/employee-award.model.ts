import { IBasePerTenantAndOrganizationEntityModel } from './base-entity.model';

export interface IEmployeeAward
	extends IBasePerTenantAndOrganizationEntityModel {
	name: string;
	employeeId: string;
	year: string;
}

export interface IEmployeeAwardFindInput
	extends IBasePerTenantAndOrganizationEntityModel {
	name?: string;
	employeeId?: string;
	year?: string;
}

export interface IEmployeeAwardCreateInput {
	name: string;
	employeeId: string;
	year: string;
}
