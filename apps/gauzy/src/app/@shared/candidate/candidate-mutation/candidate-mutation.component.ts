import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
	NbDialogRef,
	NbToastrService,
	NbStepperComponent
} from '@nebular/theme';
import { BasicInfoFormComponent } from '../../user/forms/basic-info/basic-info-form.component';
import {
	RolesEnum,
	IUser,
	IRole,
	ICandidateCreateInput,
	ICandidate,
	ICandidateDocument,
	ICandidateSource
} from '@gauzy/models';
import { OrganizationsService } from '../../../@core/services/organizations.service';
import { RoleService } from '../../../@core/services/role.service';
import { Store } from '../../../@core/services/store.service';
import { first } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { ErrorHandlingService } from '../../../@core/services/error-handling.service';
import { CandidatesService } from '../../../@core/services/candidates.service';
import { CandidateCvComponent } from '../candidate-cv/candidate-cv.component';
import { CandidateSourceService } from '../../../@core/services/candidate-source.service';

@Component({
	selector: 'ga-candidate-mutation',
	templateUrl: 'candidate-mutation.component.html',
	styleUrls: ['candidate-mutation.component.scss']
})
export class CandidateMutationComponent implements OnInit, AfterViewInit {
	@ViewChild('userBasicInfo')
	userBasicInfo: BasicInfoFormComponent;

	@ViewChild('candidateCv')
	candidateCv: CandidateCvComponent;

	@ViewChild('stepper')
	stepper: NbStepperComponent;

	form: FormGroup;
	formCV: FormGroup;
	role: IRole;
	candidates: ICandidateCreateInput[] = [];
	constructor(
		protected dialogRef: NbDialogRef<CandidateMutationComponent>,
		protected organizationsService: OrganizationsService,
		private readonly roleService: RoleService,
		protected toastrService: NbToastrService,
		protected store: Store,
		protected candidateSourceService: CandidateSourceService,
		protected candidatesService: CandidatesService,
		private errorHandler: ErrorHandlingService
	) {}

	ngOnInit(): void {}

	async ngAfterViewInit() {
		const { tenantId } = this.store.user;

		this.form = this.userBasicInfo.form;
		this.formCV = this.candidateCv.form;
		this.role = await this.roleService
			.getRoleByName({
				name: RolesEnum.CANDIDATE,
				tenantId
			})
			.pipe(first())
			.toPromise();
	}

	closeDialog(candidate: ICandidate[] = null) {
		this.dialogRef.close(candidate);
	}

	addCandidate() {
		const user: IUser = {
			username: this.form.get('username').value,
			firstName: this.form.get('firstName').value,
			lastName: this.form.get('lastName').value,
			email: this.form.get('email').value,
			imageUrl: this.form.get('imageUrl').value,
			tenant: null,
			role: this.role,
			tags: this.userBasicInfo.selectedTags
		};
		const appliedDate = this.form.get('appliedDate').value || null;
		const rejectDate = this.form.get('rejectDate').value || null;
		const hiredDate = this.form.get('hiredDate').value || null;

		const sourceName = this.form.get('source').value || null;
		let source: ICandidateSource = null;
		if (sourceName !== null) {
			source = { name: sourceName };
		}

		const cvUrl = this.formCV.get('cvUrl').value || null;
		let documents: ICandidateDocument[] = null;
		if (cvUrl !== null) {
			documents = [{ name: 'CV', documentUrl: cvUrl }];
		}

		const newCandidate: ICandidateCreateInput = {
			user,
			cvUrl,
			documents,
			password: this.form.get('password').value,
			organization: this.store.selectedOrganization,
			appliedDate,
			hiredDate,
			source,
			rejectDate,
			tags: this.userBasicInfo.selectedTags
		};

		this.candidates.push(newCandidate);
		this.userBasicInfo.loadFormData();
		this.candidateCv.loadFormData();
		this.form = this.userBasicInfo.form;
		this.formCV = this.candidateCv.form;
		this.stepper.reset();
	}
	async add() {
		this.addCandidate();

		try {
			const candidates = await this.candidatesService
				.createBulk(this.candidates)
				.pipe(first())
				.toPromise();
			this.updateSource(candidates);
			this.closeDialog(candidates);
		} catch (error) {
			this.errorHandler.handleError(error);
		}
	}

	async updateSource(createdCandidates: ICandidate[]) {
		const updateInput = [];
		const all = await this.candidatesService
			.getAll(['user'])
			.pipe(first())
			.toPromise();
		all.items.forEach((item) => {
			createdCandidates.forEach((cc) => {
				if (item.user.id === cc.userId) {
					updateInput.push({
						candidateId: item.id,
						id: cc.source.id
					});
				}
			});
		});
		await this.candidateSourceService.updateBulk(updateInput);
	}
}
