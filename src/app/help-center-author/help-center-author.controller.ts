import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
	Controller,
	UseGuards,
	HttpStatus,
	Get,
	Param,
	Delete,
	Query,
	Post,
	Body
} from '@nestjs/common';
import { CrudController, IPagination } from '../core';
import { AuthGuard } from '@nestjs/passport';
import { HelpCenterAuthor } from './help-center-author.entity';
import { HelpCenterAuthorService } from './help-center-author.service';
import { PermissionGuard } from '../shared/guards/auth/permission.guard';
import { ParseJsonPipe } from '../shared';
import { CommandBus } from '@nestjs/cqrs';
import {
	ArticleAuthorsBulkCreateCommand,
	KnowledgeBaseArticleBulkDeleteCommand
} from './commands';
import { TenantPermissionGuard } from '../shared/guards/auth/tenant-permission.guard';

@ApiTags('KnowledgeBaseAuthor')
@UseGuards(AuthGuard('jwt'), TenantPermissionGuard)
@Controller()
export class HelpCenterAuthorController extends CrudController<
	HelpCenterAuthor
> {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly helpCenterAuthorService: HelpCenterAuthorService
	) {
		super(helpCenterAuthorService);
	}
	@ApiOperation({
		summary: 'Find authors By Article Id.'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Found article authors',
		type: HelpCenterAuthor
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@UseGuards(PermissionGuard)
	@Get(':articleId')
	async findByArticleId(
		@Param('articleId') articleId: string
	): Promise<HelpCenterAuthor[]> {
		return this.helpCenterAuthorService.findByArticleId(articleId);
	}

	@ApiOperation({
		summary: 'Find all authors.'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Found authors',
		type: HelpCenterAuthor
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@Get()
	async getAll(
		@Query('data', ParseJsonPipe) data: any
	): Promise<IPagination<HelpCenterAuthor>> {
		const { relations = [], findInput = null } = data;
		return this.helpCenterAuthorService.findAll({
			relations,
			where: findInput
		});
	}

	@ApiOperation({ summary: 'Create authors in Bulk' })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'Authors have been successfully created.'
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description:
			'Invalid input, The response body may contain clues as to what went wrong'
	})
	@UseGuards(PermissionGuard)
	@Post('createBulk')
	async createBulk(@Body() input: any): Promise<HelpCenterAuthor[]> {
		return this.commandBus.execute(
			new ArticleAuthorsBulkCreateCommand(input)
		);
	}

	@ApiOperation({
		summary: 'Delete Authors By Article Id.'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Found article authors',
		type: HelpCenterAuthor
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@UseGuards(PermissionGuard)
	@Delete('deleteBulkByArticleId')
	async deleteBulkByArticleId(
		@Query('data', ParseJsonPipe) data: any
	): Promise<any> {
		const { id = null } = data;
		return this.commandBus.execute(
			new KnowledgeBaseArticleBulkDeleteCommand(id)
		);
	}
}
