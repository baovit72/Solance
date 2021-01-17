import { IInvoice } from '@gauzy/models';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InvoiceService } from '../../invoice.service';
import { InvoiceCreateCommand } from '../invoice.create.command';

@CommandHandler(InvoiceCreateCommand)
export class InvoiceCreateHandler
	implements ICommandHandler<InvoiceCreateCommand> {
	constructor(private readonly invoiceService: InvoiceService) {}

	public async execute(command: InvoiceCreateCommand): Promise<IInvoice> {
		const { input } = command;
		return this.invoiceService.create(input);
	}
}
