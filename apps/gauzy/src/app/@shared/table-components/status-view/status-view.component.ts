import { Component, OnInit, Input } from '@angular/core';
import { NbComponentStatus } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { TaskStatusEnum } from '@gauzy/models';

@Component({
	selector: 'ngx-status-view',
	templateUrl: './status-view.component.html',
	styles: [
		`
			.badge {
				text-align: center;
				position: relative !important;
				padding: 5px 30px;
				margin-bottom: 5px;
			}
		`
	]
})
export class StatusViewComponent implements OnInit, ViewCell {
	@Input() value: string;
	@Input() rowData: any;
	status: NbComponentStatus;

	ngOnInit(): void {
		switch (this.value) {
			case TaskStatusEnum.TODO:
				this.status = 'warning';
				break;
			case TaskStatusEnum.IN_PROGRESS:
				this.status = 'info';
				break;
			case TaskStatusEnum.FOR_TESTING:
				this.status = 'basic';
				break;
			case TaskStatusEnum.COMPLETED:
				this.status = 'success';
				break;
			default:
				this.status = 'basic';
				break;
		}
	}
}
