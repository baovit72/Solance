import { Component, Input, OnInit } from '@angular/core';
import {
	ControlContainer,
	FormArray,
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';
import { IPipelineStageUpdateInput } from '@gauzy/models';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { NbDialogService } from '@nebular/theme';
import { DeleteConfirmationComponent } from '../../../@shared/user/forms/delete-confirmation/delete-confirmation.component';
import { first } from 'rxjs/operators';
import { Store } from '../../../@core/services/store.service';

@Component({
	templateUrl: './stage-form.component.html',
	selector: 'ga-stage-form'
})
export class StageFormComponent implements OnInit {
	@Input('values')
	stages: IPipelineStageUpdateInput[];

	@Input()
	pipelineId: string;

	control: FormArray;

	isAdding = false;

	constructor(
		private readonly controlContainer: ControlContainer,
		private dialogService: NbDialogService,
		private fb: FormBuilder,
		private store: Store
	) {}

	ngOnInit(): void {
		this.control = this.controlContainer.control as FormArray;
		this.stages?.forEach(({ id, name, description }) => {
			this.pushNewStage({ id, name, description });
		});
	}

	reorder(event: CdkDragDrop<FormGroup>) {
		const index = this.control.controls.indexOf(event.item.data);

		this.control.removeAt(index);
		this.control.insert(event.currentIndex, event.item.data);
	}

	pushNewStage(
		{
			id,
			name,
			description
		}: Omit<IPipelineStageUpdateInput, 'pipelineId'> = {} as any
	): void {
		const { pipelineId } = this;
		const tenantId = this.store.user.tenantId;
		const organizationId = this.store.selectedOrganization.id;

		this.control.push(
			this.fb.group({
				...(pipelineId
					? { pipelineId: [pipelineId, Validators.required] }
					: {}),
				...(id ? { id: [id, Validators.required] } : {}),
				name: [name, Validators.required],
				description: [description],
				tenantId,
				organizationId
			})
		);
	}

	deleteStage(index: number) {
		this.dialogService
			.open(DeleteConfirmationComponent, {
				context: { recordType: 'Stage' }
			})
			.onClose.pipe(first())
			.subscribe((res) => {
				if (res) {
					this.control.removeAt(index);
				}
			});
	}
}
