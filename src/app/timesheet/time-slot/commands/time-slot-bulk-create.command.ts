import { ICommand } from '@nestjs/cqrs';
import { ITimeSlot } from '@gauzy/models';

export class TimeSlotBulkCreateCommand implements ICommand {
	static readonly type = '[TimeSlot] bulk create';

	constructor(public readonly slots: ITimeSlot[]) {}
}
