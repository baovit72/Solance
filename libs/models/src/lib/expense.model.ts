import { IEmployee, IEmployeeFindInput } from './employee.model';
import { IBasePerTenantAndOrganizationEntityModel } from './base-entity.model';
import { ITag } from './tag-entity.model';
import { IExpenseCategory } from './expense-category.model';
import { IOrganizationVendor } from './organization-vendors.model';
import { IOrganizationProject } from './organization-projects.model';
import { IPaginationInput } from './core.model';

export interface IExpense extends IBasePerTenantAndOrganizationEntityModel {
	employee?: IEmployee;
	employeeId?: string;
	amount: number;
	vendor: IOrganizationVendor;
	vendorId: string;
	typeOfExpense?: string;
	category: IExpenseCategory;
	categoryId: string;
	organizationContactId?: string;
	organizationContactName?: string;
	projectId?: string;
	project?: IOrganizationProject;
	projectName?: string;
	notes?: string;
	valueDate?: Date;
	currency: string;
	purpose?: string;
	taxType?: string;
	taxLabel?: string;
	rateValue?: number;
	receipt?: string;
	splitExpense?: boolean;
	tags?: ITag[];
	status?: string;
}

export interface IExpenseCreateInput
	extends IBasePerTenantAndOrganizationEntityModel {
	employeeId?: string;
	amount: number;
	typeOfExpense?: string;
	category: IExpenseCategory;
	vendor: IOrganizationVendor;
	organizationContactId?: string;
	organizationContactName?: string;
	projectId?: string;
	projectName?: string;
	notes?: string;
	valueDate: Date;
	currency?: string;
	purpose?: string;
	taxType?: string;
	taxLabel?: string;
	rateValue?: number;
	receipt?: string;
	splitExpense?: boolean;
	reference?: string;
	tags?: ITag[];
	status?: string;
}

export interface IExpenseFindInput
	extends IBasePerTenantAndOrganizationEntityModel {
	employee?: IEmployeeFindInput;
	vendorName?: string;
	vendorId?: string;
	typeOfExpense?: string;
	categoryName?: string;
	categoryId?: string;
	amount?: number;
	organizationContactId?: string;
	organizationContactName?: string;
	projectId?: string;
	projectName?: string;
	notes?: string;
	valueDate?: Date;
	currency?: string;
	purpose?: string;
	taxType?: string;
	taxLabel?: string;
	rateValue?: number;
	receipt?: string;
	splitExpense?: boolean;
	tags?: ITag[];
	status?: string;
}

export interface IExpenseUpdateInput {
	employeeId?: string;
	organizationId?: string;
	amount?: number;
	vendorName?: string;
	vendorId?: string;
	typeOfExpense?: string;
	category: IExpenseCategory;
	organizationContactId?: string;
	organizationContactName?: string;
	projectId?: string;
	projectName?: string;
	notes?: string;
	valueDate?: Date;
	currency?: string;
	purpose?: string;
	taxType?: string;
	taxLabel?: string;
	rateValue?: number;
	receipt?: string;
	splitExpense?: boolean;
	tags?: ITag[];
	status?: string;
}

export interface ISplitExpenseOutput extends IExpense {
	originalValue?: number;
	employeeCount?: number;
}

export interface ISplitExpenseFindInput {
	relations?: string[];
	filterDate?: string;
	employeeId: string;
}

export enum ExpenseTypesEnum {
	TAX_DEDUCTIBLE = 'Tax Deductible',
	NOT_TAX_DEDUCTIBLE = 'Not Tax Deductible',
	BILLABLE_TO_CONTACT = 'Billable to Contact'
}

export enum TaxTypesEnum {
	PERCENTAGE = 'Percentage',
	VALUE = 'Value'
}

export enum ExpenseStatusesEnum {
	INVOICED = 'Invoiced',
	UNINVOICED = 'Uninvoiced',
	PAID = 'Paid'
}

export interface IExpenseViewModel {
	id: string;
	valueDate: Date;
	vendorId: string;
	vendorName: string;
	vendor: IOrganizationVendor;
	typeOfExpense: string;
	categoryId: string;
	categoryName: string;
	category: IExpenseCategory;
	organizationContactId: string;
	organizationContactName: string;
	projectId: string;
	projectName: string;
	currency: string;
	amount: number;
	notes: string;
	purpose: string;
	taxType: string;
	taxLabel: string;
	employee: IEmployee;
	employeeName: string;
	rateValue: number;
	receipt: string;
	splitExpense: boolean;
	tags: ITag[];
	status: string;
}

export interface IGetExpenseInput
	extends IPaginationInput,
		IBasePerTenantAndOrganizationEntityModel {
	relations?: string[];
	types?: string[];
	titles?: string[];
	groupBy?: string;
	date?: Date | string;
	startDate?: Date | string;
	endDate?: Date | string;
	projectIds?: string[];
	employeeIds?: string[];
}

export interface IExpenseReportGroupByDate {
	date: string;
	employees: {
		employee: IEmployee;
		projects: {
			project: IOrganizationProject;
			expanse: IExpense;
			sum: number;
		}[];
	}[];
}

export interface IExpenseReportGroupByEmployee {
	employee: IEmployee;
	dates: {
		date: string;
		projects: {
			project: IOrganizationProject;
			expanse: IExpense;
			sum: number;
		}[];
	}[];
}

export interface IExpenseReportGroupByProject {
	project: IOrganizationProject;
	dates: {
		date: string;
		employees: {
			employee: IEmployee;
			expanse: IExpense;
			sum: number;
		}[];
	}[];
}

export type IExpenseReportData =
	| IExpenseReportGroupByDate
	| IExpenseReportGroupByEmployee
	| IExpenseReportGroupByProject;
