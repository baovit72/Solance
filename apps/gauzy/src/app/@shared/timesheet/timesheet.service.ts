import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
	ITimeLog,
	IGetTimeLogInput,
	IManualTimeInput,
	TimesheetStatus,
	ITimesheet,
	IGetTimesheetInput,
	IGetTimeLogConflictInput,
	IGetTimeSlotInput,
	ITimeSlot,
	IGetTimeLogReportInput,
	IAmountOwedReport,
	IGetTimeLimitReportInput,
	ITimeLimitReport,
	IClientBudgetLimitReport,
	IProjectBudgetLimitReport,
	IProjectBudgetLimitReportInput,
	IClientBudgetLimitReportInput
} from '@gauzy/models';
import { toParams } from '@gauzy/utils';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable({
	providedIn: 'root'
})
export class TimesheetService {
	interval: any;

	private _updateLog$: BehaviorSubject<boolean> = new BehaviorSubject(false);
	public updateLog$: Observable<boolean> = this._updateLog$.asObservable();

	constructor(private http: HttpClient) {}

	updateLogs(value: boolean) {
		this._updateLog$.next(value);
	}

	addTime(request: IManualTimeInput): Promise<ITimeLog> {
		return this.http
			.post<ITimeLog>('/api/timesheet/time-log', request)
			.toPromise();
	}

	updateTime(
		id: string,
		request: ITimeLog | Partial<ITimeLog>
	): Promise<ITimeLog> {
		return this.http
			.put<ITimeLog>('/api/timesheet/time-log/' + id, request)
			.toPromise();
	}

	checkOverlaps(request: IGetTimeLogConflictInput): Promise<ITimeLog[]> {
		return this.http
			.get<ITimeLog[]>('/api/timesheet/time-log/conflict', {
				params: toParams(request)
			})
			.toPromise();
	}

	getTimeSheet(id: string) {
		return this.http
			.get('/api/timesheet/' + id)
			.toPromise()
			.then((data: ITimesheet) => {
				return data;
			});
	}

	getTimeSheets(request?: IGetTimesheetInput) {
		return this.http
			.get('/api/timesheet', { params: toParams(request) })
			.toPromise()
			.then((data: ITimesheet[]) => {
				return data;
			});
	}

	getTimeSheetCount(request?: IGetTimesheetInput) {
		return this.http
			.get('/api/timesheet/count', { params: toParams(request) })
			.toPromise()
			.then((data: number) => {
				return data;
			});
	}

	updateStatus(ids: string | string[], status: TimesheetStatus) {
		return this.http
			.put(`/api/timesheet/status`, { ids, status })
			.toPromise()
			.then((data: any) => {
				return data;
			});
	}

	submitTimesheet(ids: string | string[], status: 'submit' | 'unsubmit') {
		return this.http
			.put(`/api/timesheet/submit`, { ids, status })
			.toPromise()
			.then((data: any) => {
				return data;
			});
	}

	getTimeLogs(request?: IGetTimeLogInput) {
		const params = toParams(request);
		return this.http
			.get<ITimeLog[]>('/api/timesheet/time-log', { params })
			.toPromise();
	}

	getDailyReport(request?: IGetTimeLogInput) {
		const params = toParams(request);
		return this.http
			.get('/api/timesheet/time-log/report/daily', { params })
			.toPromise();
	}

	getOwedAmountReport(request?: IGetTimeLogInput) {
		const params = toParams(request);
		return this.http
			.get<IAmountOwedReport[]>(
				'/api/timesheet/time-log/report/owed-report',
				{ params }
			)
			.toPromise();
	}

	getOwedAmountReportChartData(request?: IGetTimeLogInput) {
		const params = toParams(request);
		return this.http
			.get('/api/timesheet/time-log/report/owed-chart-data', { params })
			.toPromise();
	}

	getDailyReportChartData(request: IGetTimeLogReportInput) {
		const params = toParams(request);
		return this.http
			.get('/api/timesheet/time-log/report/daily-chart', { params })
			.toPromise();
	}

	getWeeklyReport(request?: IGetTimeLogInput) {
		const params = toParams(request);
		return this.http
			.get('/api/timesheet/time-log/report/weekly', { params })
			.toPromise();
	}

	getTimeLimit(request: IGetTimeLimitReportInput) {
		return this.http
			.get<ITimeLimitReport[]>('/api/timesheet/time-log/time-limit', {
				params: toParams(request)
			})
			.toPromise();
	}

	getProjectBudgetLimit(request: IProjectBudgetLimitReportInput) {
		return this.http
			.get<IProjectBudgetLimitReport[]>(
				'/api/timesheet/time-log/project-budget-limit',
				{
					params: toParams(request)
				}
			)
			.toPromise();
	}

	getClientBudgetLimit(request: IClientBudgetLimitReportInput) {
		return this.http
			.get<IClientBudgetLimitReport[]>(
				'/api/timesheet/time-log/client-budget-limit',
				{
					params: toParams(request)
				}
			)
			.toPromise();
	}

	getTimeLog(id: string, findOptions) {
		const params = toParams(findOptions);
		return this.http
			.get(`/api/timesheet/time-log/${id}`, { params })
			.toPromise()
			.then((data: ITimeLog) => {
				return data;
			});
	}

	getTimeSlot(id, request?: IGetTimeSlotInput) {
		const params = toParams(request);
		return this.http
			.get<ITimeSlot>(`/api/timesheet/time-slot/${id}`, { params })
			.toPromise();
	}

	getTimeSlots(request?: IGetTimeSlotInput) {
		const params = toParams(request);
		return this.http
			.get<ITimeSlot[]>('/api/timesheet/time-slot', { params })
			.toPromise();
	}

	deleteTimeSlots(ids?: string[]) {
		const params = toParams({ ids });
		return this.http
			.delete('/api/timesheet/time-slot', { params })
			.toPromise();
	}

	deleteLogs(logIds: string | string[]) {
		let payload = new HttpParams();
		if (typeof logIds === 'string') {
			logIds = [logIds];
		}
		logIds.forEach((id: string) => {
			payload = payload.append(`logIds[]`, id);
		});
		return this.http
			.delete('/api/timesheet/time-log', { params: payload })
			.toPromise();
	}
}
