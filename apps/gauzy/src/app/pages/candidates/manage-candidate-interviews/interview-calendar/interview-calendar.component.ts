import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, EventInput, disableCursor } from '@fullcalendar/core';
import { TranslateService } from '@ngx-translate/core';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { NbDialogService } from '@nebular/theme';
import { first, takeUntil } from 'rxjs/operators';
import {
	ICandidate,
	IEmployee,
	IDateRange,
	ICandidateInterview,
	IOrganization
} from '@gauzy/models';
import * as moment from 'moment';
import { TranslationBaseComponent } from 'apps/gauzy/src/app/@shared/language-base/translation-base.component';
import { CandidateInterviewService } from 'apps/gauzy/src/app/@core/services/candidate-interview.service';
import { CandidateInterviewersService } from 'apps/gauzy/src/app/@core/services/candidate-interviewers.service';
import { CandidatesService } from 'apps/gauzy/src/app/@core/services/candidates.service';
import { EmployeesService } from 'apps/gauzy/src/app/@core/services';
import { CandidateInterviewInfoComponent } from 'apps/gauzy/src/app/@shared/candidate/candidate-interview-info/candidate-interview-info.component';
import { CandidateInterviewMutationComponent } from 'apps/gauzy/src/app/@shared/candidate/candidate-interview-mutation/candidate-interview-mutation.component';
import { CandidateStore } from 'apps/gauzy/src/app/@core/services/candidate-store.service';
import { Store } from 'apps/gauzy/src/app/@core/services/store.service';
import * as _ from 'underscore';
import { ToastrService } from 'apps/gauzy/src/app/@core/services/toastr.service';
@Component({
	selector: 'ga-interview-calendar',
	templateUrl: './interview-calendar.component.html',
	styleUrls: ['./interview-calendar.component.scss']
})
export class InterviewCalendarComponent
	extends TranslationBaseComponent
	implements OnInit, OnDestroy {
	private _ngDestroy$ = new Subject<void>();
	@ViewChild('calendar', { static: true })
	calendarComponent: FullCalendarComponent;
	calendarOptions: CalendarOptions;
	selectedInterview = true;
	isCandidate = false;
	candidateList: string[] = [];
	employeeList: string[] = [];
	isEmployee = false;
	candidates: ICandidate[] = [];
	employees: IEmployee[] = [];
	calendarEvents: EventInput[] = [];
	interviewList: ICandidateInterview[];
	organization: IOrganization;
	constructor(
		readonly translateService: TranslateService,
		private dialogService: NbDialogService,
		private candidateInterviewService: CandidateInterviewService,
		private candidateInterviewersService: CandidateInterviewersService,
		private toastrService: ToastrService,
		private candidatesService: CandidatesService,
		private employeesService: EmployeesService,
		private candidateStore: CandidateStore,
		private readonly store: Store
	) {
		super(translateService);
	}

	ngOnInit() {
		this.store.selectedOrganization$
			.pipe(takeUntil(this._ngDestroy$))
			.subscribe((organization: IOrganization) => {
				if (organization) {
					const { id: organizationId, tenantId } = organization;
					this.organization = organization;
					this.candidatesService
						.getAll(['user'], { organizationId, tenantId })
						.pipe(takeUntil(this._ngDestroy$))
						.subscribe((candidates) => {
							this.candidates = candidates.items;
						});
					this.employeesService
						.getAll(['user'], { organizationId, tenantId })
						.pipe(takeUntil(this._ngDestroy$))
						.subscribe((employees) => {
							this.employees = employees.items;
						});
					this.candidateStore.interviewList$
						.pipe(takeUntil(this._ngDestroy$))
						.subscribe(() => {
							this.loadInterviews();
						});
				}
			});
	}

	async loadInterviews() {
		const { id: organizationId, tenantId } = this.organization;
		const res = await this.candidateInterviewService.getAll(
			['interviewers'],
			{ organizationId, tenantId }
		);
		if (res) {
			this.interviewList = res.items;
			this.calendarOptions = {
				eventClick: (event) => {
					const id = event.event._def.extendedProps.id;
					this.dialogService.open(CandidateInterviewInfoComponent, {
						context: {
							interviewId: id,
							interviewList: this.interviewList,
							isSlider: false
						}
					});
				},
				initialView: 'timeGridWeek',
				headerToolbar: {
					left: 'prev,next today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay'
				},
				themeSystem: 'bootstrap',
				plugins: [
					dayGridPlugin,
					timeGrigPlugin,
					interactionPlugin,
					bootstrapPlugin
				],
				weekends: true,
				height: 'auto',
				selectable: true,
				selectAllow: ({ start, end }) =>
					moment(start).isSame(moment(end), 'day'),
				select: this.handleEventSelect.bind(this),
				dateClick: this.handleDateClick.bind(this),
				eventMouseEnter: this.handleEventMouseEnter.bind(this),
				eventMouseLeave: this.handleEventMouseLeave.bind(this)
			};

			this.calendarEvents = [];
			for (const interview of res.items) {
				const { interviewers = [] } = interview;
				this.calendarEvents.push({
					title: interview.title,
					start: interview.startTime,
					end: interview.endTime,
					candidateId: interview.candidateId,
					id: interview.id,
					extendedProps: {
						id: interview.id
					},
					backgroundColor: '#36f',
					employeeIds: _.pluck(interviewers, 'employeeId')
				});
			}
			this.mappedCalendarEvents();
		}
	}
	async onCandidateSelected(ids: string[]) {
		this.isCandidate = !ids.length ? false : true;
		this.candidateList = ids;
		this.mappedCalendarEvents();
	}
	async onEmployeeSelected(ids: string[]) {
		this.isEmployee = !ids.length ? false : true;
		this.employeeList = ids;
		this.mappedCalendarEvents();
	}
	async mappedCalendarEvents() {
		let result = [];
		for (const event of this.calendarEvents as EventInput[]) {
			if (this.isCandidate && this.isEmployee) {
				let isMatchCandidate,
					isMatchEmployee = false;
				if (this.candidateList.includes(event.candidateId)) {
					isMatchCandidate = true;
				}
				for (const id of this.employeeList) {
					if (event.employeeIds.includes(id)) {
						isMatchEmployee = true;
					}
				}
				if (isMatchCandidate && isMatchEmployee) {
					result.push(event);
				}
			} else if (this.isCandidate) {
				if (this.candidateList.includes(event.candidateId)) {
					result.push(event);
				}
			} else if (this.isEmployee) {
				let isMatchEmployee = false;
				for (const id of this.employeeList) {
					if (event.employeeIds.includes(id)) {
						isMatchEmployee = true;
					}
				}
				if (isMatchEmployee) {
					result.push(event);
				}
			} else {
				result = this.calendarEvents;
			}
		}
		this.calendarOptions.events = result;
	}
	async getInterviewers() {
		for (const event of this.calendarOptions.events as EventInput[]) {
			return await this.candidateInterviewersService.findByInterviewId(
				event.id as string
			);
		}
	}
	async add(selectedRange?: IDateRange) {
		const dialog = this.dialogService.open(
			CandidateInterviewMutationComponent,
			{
				context: {
					header: this.getTranslation(
						'CANDIDATES_PAGE.EDIT_CANDIDATE.INTERVIEW.SCHEDULE_INTERVIEW'
					),
					isCalendar: true,
					selectedRangeCalendar: selectedRange,
					interviewList: this.interviewList
				}
			}
		);
		const data = await dialog.onClose.pipe(first()).toPromise();
		if (data) {
			this.toastrService.success(
				`TOASTR.MESSAGE.CANDIDATE_EDIT_CREATED`,
				{
					name: data.title
				}
			);
			this.loadInterviews();
		}
	}
	handleDateClick(event) {
		if (event.view.type === 'dayGridMonth') {
			this.calendarComponent
				.getApi()
				.changeView('timeGridWeek', event.date);
		}
	}
	handleEventSelect(event) {
		const now = new Date().getTime();
		if (now < event.start.getTime()) {
			this.add({ start: event.start, end: event.end });
		} else {
			disableCursor();
		}
	}
	handleEventMouseEnter({ el }) {
		if (this.hasOverflow(el.querySelector('.fc-event-main'))) {
			el.style.position = 'unset';
		}
	}
	handleEventMouseLeave({ el }) {
		el.removeAttribute('style');
	}
	hasOverflow(el: HTMLElement) {
		if (!el) {
			return;
		}
		const curOverflow = el.style ? el.style.overflow : 'hidden';

		if (!curOverflow || curOverflow === 'visible') {
			el.style.overflow = 'hidden';
		}

		const isOverflowing =
			el.clientWidth < el.scrollWidth ||
			el.clientHeight < el.scrollHeight;

		if (el.style) {
			el.style.overflow = curOverflow;
		}

		return isOverflowing;
	}
	ngOnDestroy() {
		this._ngDestroy$.next();
		this._ngDestroy$.complete();
	}
}
