import { CrudController, IPagination } from '../core';
import { Invoice } from './invoice.entity';
import { InvoiceService } from './invoice.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
	Controller,
	UseGuards,
	HttpCode,
	HttpStatus,
	Put,
	Param,
	Body,
	Query,
	Get,
	Req,
	Post,
	Delete
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from '../shared/decorators/permissions';
import { PermissionGuard } from '../shared/guards/auth/permission.guard';
import {
	PermissionsEnum,
	IInvoice,
	LanguagesEnum,
	IInvoiceCreateInput,
	IInvoiceUpdateInput
} from '@gauzy/models';
import { ParseJsonPipe, UUIDValidationPipe } from '../shared';
import { I18nLang } from 'nestjs-i18n';
import { TenantPermissionGuard } from '../shared/guards/auth/tenant-permission.guard';
import { CommandBus } from '@nestjs/cqrs';
import {
	InvoiceCreateCommand,
	InvoiceDeleteCommand,
	InvoiceUpdateCommand
} from './commands';
import { DeleteResult } from 'typeorm';
import { InvoiceSendEmailCommand } from './commands/invoice.send.email.command';

@ApiTags('Invoice')
@Controller()
export class InvoiceController extends CrudController<Invoice> {
	constructor(
		private readonly invoiceService: InvoiceService,
		private readonly commandBus: CommandBus
	) {
		super(invoiceService);
	}

	@UseGuards(AuthGuard('jwt'), TenantPermissionGuard, PermissionGuard)
	@Permissions(PermissionsEnum.INVOICES_VIEW)
	@Get()
	async findAllInvoices(
		@Query('data', ParseJsonPipe) data: any
	): Promise<IPagination<IInvoice>> {
		const { relations = [], findInput = null } = data;
		return this.invoiceService.findAll({
			where: findInput,
			relations
		});
	}

	@UseGuards(AuthGuard('jwt'), TenantPermissionGuard, PermissionGuard)
	@Permissions(PermissionsEnum.INVOICES_VIEW)
	@Get('highest')
	async findHighestInvoiceNumber(): Promise<IPagination<IInvoice>> {
		return this.invoiceService.getHighestInvoiceNumber();
	}

	@UseGuards(AuthGuard('jwt'), TenantPermissionGuard, PermissionGuard)
	@Permissions(PermissionsEnum.INVOICES_VIEW)
	@Get(':id')
	async findByIdWithRelations(
		@Param('id') id: string,
		@Query('data', ParseJsonPipe) data: any
	): Promise<IInvoice> {
		const { relations = [], findInput = null } = data;
		return this.invoiceService.findOne(id, {
			where: findInput,
			relations
		});
	}

	@ApiOperation({ summary: 'Create new record' })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'The record has been successfully created.'
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description:
			'Invalid input, The response body may contain clues as to what went wrong'
	})
	@HttpCode(HttpStatus.ACCEPTED)
	@UseGuards(AuthGuard('jwt'), TenantPermissionGuard, PermissionGuard)
	@Permissions(PermissionsEnum.INVOICES_EDIT)
	@Post()
	async createInvoice(@Body() entity: IInvoiceCreateInput): Promise<Invoice> {
		return this.commandBus.execute(new InvoiceCreateCommand(entity));
	}

	@ApiOperation({ summary: 'Update record' })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'The record has been successfully edited.'
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description:
			'Invalid input, The response body may contain clues as to what went wrong'
	})
	@HttpCode(HttpStatus.ACCEPTED)
	@UseGuards(AuthGuard('jwt'), TenantPermissionGuard, PermissionGuard)
	@Permissions(PermissionsEnum.INVOICES_EDIT)
	@Put(':id')
	async updateInvoice(
		@Param('id', UUIDValidationPipe) id: string,
		@Body() entity: IInvoiceUpdateInput
	): Promise<Invoice> {
		return this.commandBus.execute(
			new InvoiceUpdateCommand({ id, ...entity })
		);
	}

	@ApiOperation({ summary: 'Update record' })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'The record has been successfully edited.'
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description:
			'Invalid input, The response body may contain clues as to what went wrong'
	})
	@HttpCode(HttpStatus.ACCEPTED)
	@Put('estimate/:id')
	async updateWithoutGuard(
		@Param('id', UUIDValidationPipe) id: string,
		@Body() entity: IInvoice
	): Promise<Invoice> {
		return this.commandBus.execute(
			new InvoiceUpdateCommand({ id, ...entity })
		);
	}

	@HttpCode(HttpStatus.ACCEPTED)
	@UseGuards(AuthGuard('jwt'))
	@Put('email/:email')
	async emailInvoice(
		@Param('email') email: string,
		@Req() request,
		@I18nLang() languageCode: LanguagesEnum
	): Promise<any> {
		return this.commandBus.execute(
			new InvoiceSendEmailCommand(
				languageCode,
				email,
				request.body.params,
				request.get('Origin')
			)
		);
	}

	@ApiOperation({ summary: 'Delete record' })
	@ApiResponse({
		status: HttpStatus.NO_CONTENT,
		description: 'The record has been successfully deleted'
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@HttpCode(HttpStatus.ACCEPTED)
	@Delete(':id')
	async delete(
		@Param('id', UUIDValidationPipe) id: string
	): Promise<DeleteResult> {
		return this.commandBus.execute(new InvoiceDeleteCommand(id));
	}
}
