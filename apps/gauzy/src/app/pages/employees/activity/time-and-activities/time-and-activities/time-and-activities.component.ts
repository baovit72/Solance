import { Component, OnInit } from '@angular/core';
import { ITimeLogFilters } from '@gauzy/models';
import { TimesheetFilterService } from 'apps/gauzy/src/app/@shared/timesheet/timesheet-filter.service';

@Component({
	selector: 'gauzy-time-and-activities',
	templateUrl: './time-and-activities.component.html',
	styleUrls: ['./time-and-activities.component.scss']
})
export class TimeAndActivitiesComponent implements OnInit {
	// logRequest: ITimeLogFilters = {
	//   startDate: moment().startOf('week').toDate(),
	//   endDate: moment().endOf('week').toDate()
	// };
	filters: ITimeLogFilters;

	constructor(private timesheetFilterService: TimesheetFilterService) {}

	async filtersChange($event: ITimeLogFilters) {
		this.timesheetFilterService.filter = $event;
		this.filters = Object.assign({}, $event);
		// this.updateLogs$.next();
	}

	ngOnInit(): void {}
}
