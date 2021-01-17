import { RequestApprovalService } from '../../@core/services/request-approval.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
	NbIconModule,
	NbCardModule,
	NbButtonModule,
	NbInputModule,
	NbSelectModule,
	NbCheckboxModule,
	NbRadioModule
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpLoaderFactory, ThemeModule } from '../../@theme/theme.module';
import { RequestApprovalMutationComponent } from './approvals-mutation.component';
import { Store } from '../../@core/services/store.service';
import { EmployeeMultiSelectModule } from '../employee/employee-multi-select/employee-multi-select.module';
import { ApprovalPolicyService } from '../../@core/services/approval-policy.service';
import { TagsColorInputModule } from '../tags/tags-color-input/tags-color-input.module';

@NgModule({
	imports: [
		ThemeModule,
		FormsModule,
		NbCardModule,
		NbIconModule,
		NbCheckboxModule,
		ReactiveFormsModule,
		NbButtonModule,
		NbInputModule,
		NbSelectModule,
		NbRadioModule,
		NgSelectModule,
		EmployeeMultiSelectModule,
		TagsColorInputModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	declarations: [RequestApprovalMutationComponent],
	entryComponents: [],
	providers: [RequestApprovalService, ApprovalPolicyService, Store]
})
export class RequestApprovalMutationModule {}
