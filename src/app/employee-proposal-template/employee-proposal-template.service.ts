import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../core';
import { EmployeeProposalTemplate } from './employee-proposal-template.entity';

@Injectable()
export class EmployeeProposalTemplateService extends CrudService<
	EmployeeProposalTemplate
> {
	constructor(
		@InjectRepository(EmployeeProposalTemplate)
		private readonly employeeProposalTemplateRepository: Repository<
			EmployeeProposalTemplate
		>
	) {
		super(employeeProposalTemplateRepository);
	}

	async makeDefault(id: string) {
		const proposalTemplate = await this.employeeProposalTemplateRepository.findOne(
			id
		);
		proposalTemplate.isDefault = true;

		await this.employeeProposalTemplateRepository.update(
			{
				employeeId: proposalTemplate.employeeId
			},
			{
				isDefault: false
			}
		);

		await this.employeeProposalTemplateRepository.save(proposalTemplate);

		return proposalTemplate;
	}
}
