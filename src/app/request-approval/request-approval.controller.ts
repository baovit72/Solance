import { CrudController, IPagination } from '../core';
import { RequestApproval } from './request-approval.entity';
import { RequestApprovalService } from './request-approval.service';
import {
	IRequestApproval,
	PermissionsEnum,
	IRequestApprovalCreateInput,
	RequestApprovalStatusTypesEnum
} from '@gauzy/models';
import {
	Query,
	HttpStatus,
	UseGuards,
	Get,
	Post,
	Body,
	HttpCode,
	Put,
	Param,
	Controller
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from '../shared/guards/auth/permission.guard';
import { Permissions } from '../shared/decorators/permissions';
import { AuthGuard } from '@nestjs/passport';
import { RequestApprovalStatusCommand } from './commands';
import { TenantPermissionGuard } from '../shared/guards/auth/tenant-permission.guard';
import { ParseJsonPipe } from '../shared/pipes/parse-json.pipe';

@ApiTags('RequestApproval')
@UseGuards(AuthGuard('jwt'), TenantPermissionGuard, PermissionGuard)
@Controller()
export class RequestApprovalControler extends CrudController<RequestApproval> {
	constructor(
		private readonly requestApprovalService: RequestApprovalService,
		private commandBus: CommandBus
	) {
		super(requestApprovalService);
	}

	@ApiOperation({ summary: 'Find all request approvals.' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Found policies',
		type: RequestApproval
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@Permissions(PermissionsEnum.REQUEST_APPROVAL_VIEW)
	@Get()
	findAllRequestApprovals(
		@Query('data', ParseJsonPipe) data: any
	): Promise<IPagination<IRequestApproval>> {
		const { relations, findInput } = data;
		return this.requestApprovalService.findAllRequestApprovals(
			{ relations },
			findInput
		);
	}

	@ApiOperation({ summary: 'Find all request approval.' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Found policies',
		type: RequestApproval
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@Permissions(PermissionsEnum.REQUEST_APPROVAL_VIEW)
	@Get('employee/:id')
	findRequestApprovalsByEmployeeId(
		@Param('id') id: string,
		@Query('data', ParseJsonPipe) data: any
	): Promise<IPagination<IRequestApproval>> {
		const { relations, findInput } = data;
		return this.requestApprovalService.findRequestApprovalsByEmployeeId(
			id,
			relations,
			findInput
		);
	}

	@ApiOperation({ summary: 'create a request approval.' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Found policies',
		type: RequestApproval
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@Permissions(PermissionsEnum.REQUEST_APPROVAL_EDIT)
	@Post()
	async createRequestApproval(
		@Body() entity: IRequestApprovalCreateInput
	): Promise<RequestApproval> {
		return this.requestApprovalService.createRequestApproval(entity);
	}

	@ApiOperation({ summary: 'employee accept request approval.' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Found policies',
		type: RequestApproval
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@HttpCode(HttpStatus.ACCEPTED)
	@Permissions(PermissionsEnum.REQUEST_APPROVAL_EDIT)
	@Put('approval/:id')
	async employeeApprovalRequestApproval(
		@Param('id') id: string
	): Promise<RequestApproval> {
		return this.commandBus.execute(
			new RequestApprovalStatusCommand(
				id,
				RequestApprovalStatusTypesEnum.APPROVED
			)
		);
	}

	@ApiOperation({ summary: 'employee refuse request approval.' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Found policies',
		type: RequestApproval
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@HttpCode(HttpStatus.ACCEPTED)
	@Permissions(PermissionsEnum.REQUEST_APPROVAL_EDIT)
	@Put('refuse/:id')
	async employeeRefuseRequestApproval(
		@Param('id') id: string
	): Promise<RequestApproval> {
		return this.commandBus.execute(
			new RequestApprovalStatusCommand(
				id,
				RequestApprovalStatusTypesEnum.REFUSED
			)
		);
	}

	@ApiOperation({ summary: 'update a request approval.' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Found policies',
		type: RequestApproval
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@HttpCode(HttpStatus.ACCEPTED)
	@Permissions(PermissionsEnum.REQUEST_APPROVAL_EDIT)
	@Put(':id')
	async updateRequestApprovalByAdmin(
		@Param('id') id: string,
		@Body() entity: IRequestApprovalCreateInput
	): Promise<RequestApproval> {
		return this.requestApprovalService.updateRequestApproval(id, entity);
	}
}
