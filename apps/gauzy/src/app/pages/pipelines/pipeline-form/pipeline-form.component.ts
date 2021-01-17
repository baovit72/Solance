import { Component, Input, OnInit } from '@angular/core';
import {
	IOrganization,
	IPipelineCreateInput,
	IUserOrganization
} from '@gauzy/models';
import { UsersOrganizationsService } from '../../../@core/services/users-organizations.service';
import { Store } from '../../../@core/services/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PipelinesService } from '../../../@core/services/pipelines.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
	templateUrl: './pipeline-form.component.html',
	selector: 'ga-pipeline-form'
})
export class PipelineFormComponent implements OnInit {
	@Input()
	pipeline: IPipelineCreateInput & { id?: string };

	userOrganizations: IUserOrganization[];
	form: FormGroup;
	icon: string;
	isActive: boolean;
	organization: IOrganization;

	constructor(
		public dialogRef: NbDialogRef<PipelineFormComponent['pipeline']>,
		private usersOrganizationsService: UsersOrganizationsService,
		private pipelinesService: PipelinesService,
		private fb: FormBuilder,
		private store: Store
	) {}

	ngOnInit(): void {
		const { id, isActive } = this.pipeline;
		const { userId } = this.store;

		isActive === undefined
			? (this.isActive = true)
			: (this.isActive = isActive);

		this.usersOrganizationsService
			.getAll(['organization'], {
				userId,
				tenantId: this.pipeline.tenantId
			})
			.then(({ items }) => (this.userOrganizations = items));
		this.form = this.fb.group({
			organizationId: [
				this.pipeline.organizationId || '',
				Validators.required
			],
			tenantId: [this.pipeline.tenantId || ''],
			name: [this.pipeline.name || '', Validators.required],
			...(id ? { id: [id, Validators.required] } : {}),
			description: [this.pipeline.description],
			stages: this.fb.array([]),
			isActive: [this.isActive]
		});
	}

	setIsActive() {
		this.isActive = !this.isActive;
	}

	persist(): void {
		const {
			value,
			value: { id }
		} = this.form;

		Promise.race([
			id
				? this.pipelinesService.update(id, value)
				: this.pipelinesService.create(value)
		]).then((entity) => this.dialogRef.close(entity));
	}
}
