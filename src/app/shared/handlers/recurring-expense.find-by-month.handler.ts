import {
	IRecurringExpenseByMonthFindInput,
	IRecurringExpenseModel
} from '@gauzy/models';
import { IsNull, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { CrudService, getLastDayOfMonth, IPagination } from '../../core';

/**
 * Finds income, expense, profit and bonus for all organizations for the given month.
 *
 * (start date) < (input date) < (end date, null for end date is treated as infinity)
 *
 * If year is different, only company year.
 * If year is same, compare month
 */
export abstract class FindRecurringExpenseByMonthHandler<
	T extends IRecurringExpenseModel
> {
	//TODO: Change CrudService<any> to be more specific
	constructor(private readonly crudService: CrudService<T>) {}

	public async executeCommand(
		input: IRecurringExpenseByMonthFindInput | any,
		relations?: string[]
	): Promise<IPagination<T>> {
		const lastDayOfMonth = getLastDayOfMonth(input.year, input.month);
		const inputStartDate = new Date(
			input.year,
			input.month,
			lastDayOfMonth
		);
		const inputEndDate = new Date(input.year, input.month, 1);

		let whereId: Object = input.employeeId
			? {
					employeeId: input.employeeId,
					organizationId: input.organizationId,
					tenantId: input.tenantId
			  }
			: {
					organizationId: input.organizationId,
					tenantId: input.tenantId
			  };

		if (input.parentRecurringExpenseId) {
			whereId = {
				...whereId,
				parentRecurringExpenseId: input.parentRecurringExpenseId
			};
		}

		const expenses = await this.crudService.findAll({
			where: [
				{
					...whereId,
					startDate: LessThanOrEqual(inputStartDate),
					endDate: IsNull()
				},
				{
					...whereId,
					startDate: LessThanOrEqual(inputStartDate),
					endDate: MoreThanOrEqual(inputEndDate)
				}
			],
			relations
		});

		return expenses;
	}
}
