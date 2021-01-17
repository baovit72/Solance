import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
	IBaseEntityWithMembers,
	IEditEntityByMemberInput,
	IEmployee
} from '@gauzy/models';

@Component({
	selector: 'ga-edit-employee-membership',
	templateUrl: './edit-employee-membership-form.component.html',
	styleUrls: ['./edit-employee-membership-form.component.scss']
})
export class EditEmployeeMembershipFormComponent implements OnInit {
	@Input() organizationEntities: IBaseEntityWithMembers[];
	@Input() employeeEntities: IBaseEntityWithMembers[];
	@Input() selectedEmployee: IEmployee;
	@Input() placeholder: string;
	@Input() title: string;

	@Output() entitiesAdded = new EventEmitter<IEditEntityByMemberInput>();
	@Output() entitiesRemoved = new EventEmitter<IEditEntityByMemberInput>();

	showAddCard: boolean;

	form: FormGroup;

	constructor(private fb: FormBuilder) {}

	ngOnInit() {
		this._initializeForm();
	}

	private _initializeForm() {
		this.form = this.fb.group({
			departments: ['', Validators.required]
		});
	}

	async removeDepartment(id: string) {
		this.entitiesRemoved.emit({
			member: this.selectedEmployee,
			removedEntityIds: [id]
		});
	}

	async submitForm() {
		if (this.form.valid) {
			this.entitiesAdded.emit({
				member: this.selectedEmployee,
				addedEntityIds: this.form.value.departments
			});
			this.showAddCard = !this.showAddCard;
			this.form.reset();
		}
	}
}
