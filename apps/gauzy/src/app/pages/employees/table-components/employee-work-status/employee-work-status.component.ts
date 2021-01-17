import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
	templateUrl: './employee-work-status.component.html',
	styleUrls: ['./employee-work-status.component.scss']
})
export class EmployeeWorkStatusComponent implements ViewCell {
	@Input()
	rowData: any;

	value: string | number;
}
