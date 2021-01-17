import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
	Controller,
	HttpStatus,
	Get,
	HttpCode,
	UseGuards,
	Put,
	Param,
	Body
} from '@nestjs/common';
import { CrudController, IPagination } from '../core';
import { EquipmentSharing } from './equipment-sharing.entity';
import { EquipmentSharingService } from './equipment-sharing.service';
import { AuthGuard } from '@nestjs/passport';
import { RequestApprovalStatusTypesEnum } from '@gauzy/models';
import { Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
	EquipmentSharingStatusCommand,
	EquipmentSharingCreateCommand,
	EquipmentSharingUpdateCommand
} from './commands';
import { TenantPermissionGuard } from '../shared/guards/auth/tenant-permission.guard';

@ApiTags('EquipmentSharing')
@UseGuards(AuthGuard('jwt'), TenantPermissionGuard)
@Controller()
export class EquipmentSharingController extends CrudController<
	EquipmentSharing
> {
	constructor(
		private readonly equipmentSharingService: EquipmentSharingService,
		private commandBus: CommandBus
	) {
		super(equipmentSharingService);
	}

	@ApiOperation({
		summary: 'Find all equipment sharings'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Found equipment sharings',
		type: EquipmentSharing
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@Get()
	async findAllEquipmentSharings(): Promise<IPagination<EquipmentSharing>> {
		return this.equipmentSharingService.findAllEquipmentSharings();
	}

	@ApiOperation({
		summary: 'Find equipment sharings By Orgization Id'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Found equipment sharings',
		type: EquipmentSharing
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@Get('/organization/:id')
	async findEquipmentSharingsByOrgId(
		@Param('id') orgId: string
	): Promise<IPagination<EquipmentSharing>> {
		return this.equipmentSharingService.findEquipmentSharingsByOrgId(orgId);
	}

	@ApiOperation({
		summary: 'Find equipment sharings By Employee Id'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Found equipment sharings',
		type: EquipmentSharing
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@Get('employee/:id')
	async findEquipmentSharingsByEmployeeId(
		@Param('id') empId: string
	): Promise<IPagination<EquipmentSharing>> {
		return this.equipmentSharingService.findRequestApprovalsByEmployeeId(
			empId
		);
	}

	@ApiOperation({ summary: 'Update an existing record' })
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
	@Post('organization/:id')
	async createEquipmentSharing(
		@Param('id') orgId: string,
		@Body() equipmentSharing: EquipmentSharing
	): Promise<any> {
		return this.commandBus.execute(
			new EquipmentSharingCreateCommand(orgId, equipmentSharing)
		);
	}

	@ApiOperation({ summary: 'Update an existing record' })
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
	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() equipmentSharing: EquipmentSharing
	): Promise<any> {
		return this.commandBus.execute(
			new EquipmentSharingUpdateCommand(id, equipmentSharing)
		);
	}

	@ApiOperation({ summary: 'equipment sharings request approval' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Found equipment sharings',
		type: EquipmentSharing
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@HttpCode(HttpStatus.ACCEPTED)
	@Put('approval/:id')
	async equipmentSharingsRequestApproval(
		@Param('id') id: string
	): Promise<EquipmentSharing> {
		return this.commandBus.execute(
			new EquipmentSharingStatusCommand(
				id,
				RequestApprovalStatusTypesEnum.APPROVED
			)
		);
	}

	@ApiOperation({ summary: 'equipment sharings request refuse' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Found equipment sharings',
		type: EquipmentSharing
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@HttpCode(HttpStatus.ACCEPTED)
	@Put('refuse/:id')
	async equipmentSharingsRequestRefuse(
		@Param('id') id: string
	): Promise<EquipmentSharing> {
		return this.commandBus.execute(
			new EquipmentSharingStatusCommand(
				id,
				RequestApprovalStatusTypesEnum.REFUSED
			)
		);
	}
}
