import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { HubstaffService } from './hubstaff.service';
import {
	IIntegrationTenant,
	IHubstaffOrganization,
	IHubstaffProject,
	IIntegrationMap
} from '@gauzy/models';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Integrations')
@UseGuards(AuthGuard('jwt'))
@Controller()
export class HubstaffController {
	constructor(private _hubstaffService: HubstaffService) {}

	@Get('/get-token/:integrationId')
	getHubstaffToken(
		@Param('integrationId') integrationId: string
	): Promise<string> {
		return this._hubstaffService.getHubstaffToken(integrationId);
	}

	@Get('/refresh-token/:integrationId')
	refreshHubstaffToken(
		@Param('integrationId') integrationId: string
	): Promise<string> {
		return this._hubstaffService.refreshToken(integrationId);
	}

	@Post('/add-integration')
	addIntegration(@Body() body): Promise<IIntegrationTenant> {
		return this._hubstaffService.addIntegration(body);
	}

	@Post('/organizations/:integrationId')
	async getOrganizations(
		@Param('integrationId') integrationId: string,
		@Body() body
	): Promise<IHubstaffOrganization[]> {
		return this._hubstaffService.fetchOrganizations({
			integrationId,
			...body
		});
	}

	@Post('/projects/:organizationId')
	async getProjects(
		@Param('organizationId') organizationId: string,
		@Body() body
	): Promise<IHubstaffProject[]> {
		return this._hubstaffService.fetchOrganizationProjects({
			organizationId,
			...body
		});
	}

	@Post('/sync-projects/:integrationId')
	async syncProjects(
		@Param('integrationId') integrationId: string,
		@Body() body
	): Promise<IIntegrationMap[]> {
		return await this._hubstaffService.syncProjects({
			integrationId,
			...body
		});
	}

	@Post('/sync-organizations/:integrationId')
	async syncOrganizations(
		@Param('integrationId') integrationId: string,
		@Body() body
	): Promise<IIntegrationMap[]> {
		return await this._hubstaffService.syncOrganizations({
			integrationId,
			...body
		});
	}

	@Post('/auto-sync/:integrationId')
	async autoSync(
		@Param('integrationId') integrationId: string,
		@Body() body
	): Promise<any> {
		return await this._hubstaffService.autoSync({
			integrationId,
			...body
		});
	}
}
