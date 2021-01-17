import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	ITimeLog,
	ITimerToggleInput,
	TimeLogType,
	ITimerStatus,
	IOrganization,
	TimerState,
	TimeLogSourceEnum
} from '@gauzy/models';
import { toLocal } from '@gauzy/utils';
import * as moment from 'moment';
import { StoreConfig, Store, Query } from '@datorama/akita';
import { Store as AppStore } from '../../@core/services/store.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export function createInitialTimerState(): TimerState {
	let timerConfig = {
		isBillable: true,
		organizationId: null,
		tenantId: null,
		projectId: null,
		taskId: null,
		organizationContactId: null,
		description: '',
		logType: TimeLogType.TRACKED,
		tags: []
	};
	try {
		const config = localStorage.getItem('timerConfig');
		if (config) {
			timerConfig = {
				...timerConfig,
				...JSON.parse(config)
			};
		}
	} catch (error) {}
	return {
		showTimerWindow: false,
		duration: 0,
		current_session_duration: 0,
		running: false,
		timerConfig
	} as TimerState;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'timer' })
export class TimerStore extends Store<TimerState> {
	constructor() {
		super(createInitialTimerState());
	}
}

@Injectable({ providedIn: 'root' })
export class TimerQuery extends Query<TimerState> {
	constructor(protected store: TimerStore) {
		super(store);
	}
}

@UntilDestroy()
@Injectable({
	providedIn: 'root'
})
export class TimeTrackerService implements OnDestroy {
	interval: any;

	showTimerWindow$ = this.timerQuery.select((state) => state.showTimerWindow);
	duration$ = this.timerQuery.select((state) => state.duration);
	current_session_duration$ = this.timerQuery.select(
		(state) => state.current_session_duration
	);
	$running = this.timerQuery.select((state) => state.running);
	$timerConfig = this.timerQuery.select((state) => state.timerConfig);
	organization: IOrganization;

	private _trackType$: BehaviorSubject<string> = new BehaviorSubject(
		this.timeType
	);
	public trackType$: Observable<string> = this._trackType$.asObservable();

	constructor(
		protected timerStore: TimerStore,
		protected timerQuery: TimerQuery,
		protected store: AppStore,
		private http: HttpClient
	) {
		this.store.selectedOrganization$
			.pipe(
				filter((organization) => !!organization),
				untilDestroyed(this)
			)
			.subscribe((organization: IOrganization) => {
				const { tenantId } = this.store.user;
				this.organization = organization;
				if (organization) {
					this.timerStore.update({
						timerConfig: {
							...this.timerConfig,
							organizationId: organization.id,
							tenantId
						}
					});
				}
			});
	}

	/*
	 * Check current timer status for employee only
	 */
	public checkTimerStatus(tenantId: string) {
		this.getTimerStatus(tenantId)
			.then((status: ITimerStatus) => {
				this.duration = status.duration;
				if (status.lastLog && !status.lastLog.stoppedAt) {
					this.current_session_duration = moment().diff(
						toLocal(status.lastLog.startedAt),
						'seconds'
					);
				} else {
					this.current_session_duration = 0;
				}
				if (status.running) {
					this.turnOnTimer();
				} else {
					this.turnOffTimer();
				}
			})
			.catch(() => {});
	}

	public get showTimerWindow(): boolean {
		const { showTimerWindow } = this.timerQuery.getValue();
		return showTimerWindow;
	}
	public set showTimerWindow(value: boolean) {
		this.timerStore.update({
			showTimerWindow: value
		});
	}

	public get duration(): number {
		const { duration } = this.timerQuery.getValue();
		return duration;
	}
	public set duration(value: number) {
		this.timerStore.update({
			duration: value
		});
	}

	public get current_session_duration(): number {
		const { current_session_duration } = this.timerQuery.getValue();
		return current_session_duration;
	}
	public set current_session_duration(value: number) {
		this.timerStore.update({
			current_session_duration: value
		});
	}

	public get timerConfig(): ITimerToggleInput {
		const { timerConfig } = this.timerQuery.getValue();
		return timerConfig;
	}
	public set timerConfig(value: ITimerToggleInput) {
		// localStorage.setItem('timerConfig', JSON.stringify(value));
		this.timerStore.update({
			timerConfig: value
		});
	}

	public get running(): boolean {
		const { running } = this.timerQuery.getValue();
		return running;
	}
	public set running(value: boolean) {
		this.timerStore.update({
			running: value
		});
	}

	getTimerStatus(tenantId: string): Promise<ITimerStatus> {
		return this.http
			.get<ITimerStatus>('/api/timesheet/timer/status', {
				params: {
					source: TimeLogSourceEnum.BROWSER,
					tenantId
				}
			})
			.toPromise();
	}

	// toggleTimer(request: ITimerToggleInput): Promise<ITimeLog> {
	// 	return this.http
	// 		.post<ITimeLog>('/api/timesheet/timer/toggle', request)
	// 		.toPromise();
	// }

	openAndStartTimer() {
		this.showTimerWindow = true;
		if (!this.running) {
			if (this.canStartTimer()) {
				this.current_session_duration = 0;
				this.toggle();
			}
		}
	}

	toggle() {
		if (this.interval) {
			this.turnOffTimer();
			return this.http
				.post<ITimeLog>('/api/timesheet/timer/stop', this.timerConfig)
				.toPromise();
		} else {
			this.current_session_duration = 0;
			this.turnOnTimer();
			return this.http
				.post<ITimeLog>('/api/timesheet/timer/start', this.timerConfig)
				.toPromise();
		}
	}

	turnOnTimer() {
		this.running = true;
		this.interval = setInterval(() => {
			this.duration++;
			this.current_session_duration++;
		}, 1000);
	}

	turnOffTimer() {
		this.running = false;
		clearInterval(this.interval);
		this.interval = null;
	}

	canStartTimer() {
		let isValid = true;
		if (this.organization) {
			if (
				this.organization.requireProject &&
				!this.timerConfig.projectId
			) {
				isValid = false;
			}
			if (this.organization.requireTask && !this.timerConfig.taskId) {
				isValid = false;
			}
			if (
				this.organization.requireDescription &&
				!this.timerConfig.description
			) {
				isValid = false;
			}
		} else {
			isValid = false;
		}
		return isValid;
	}

	setTimeLogType(timeType: string) {
		this._trackType$.next(timeType);
		this.timeType =
			timeType === 'TRACKED' ? TimeLogType.TRACKED : TimeLogType.MANUAL;
	}

	public get timeType(): TimeLogType {
		return this.timerConfig.logType;
	}
	public set timeType(value: TimeLogType) {
		this.timerConfig = {
			...this.timerConfig,
			logType: value
		};
	}

	/*
	 * Clear time tracker local store
	 */
	clearTimeTracker() {
		const obj = createInitialTimerState();
		this.timerStore.update(obj);
		return obj;
	}

	ngOnDestroy(): void {}
}
