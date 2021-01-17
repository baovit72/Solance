import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Between } from 'typeorm';
import * as _ from 'underscore';
import {
	PermissionsEnum,
	IGetActivitiesStatistics,
	IGetTimeSlotStatistics,
	IGetTasksStatistics,
	IGetProjectsStatistics,
	IGetMembersStatistics,
	IGetCountsStatistics,
	ICountsStatistics,
	IMembersStatistics,
	IActivitiesStatistics,
	ITimeSlotStatistics,
	IProjectsStatistics,
	IGetManualTimesStatistics,
	IManualTimesStatistics,
	TimeLogType
} from '@gauzy/models';
import { TimeSlot } from '../time-slot.entity';
import { Employee } from '../../employee/employee.entity';
import { RequestContext } from '../../core/context';
import { OrganizationProject } from '../../organization-projects/organization-projects.entity';
import { Task } from '../../tasks/task.entity';
import { Activity } from '../activity.entity';
import * as moment from 'moment';
import { TimeLog } from '../time-log.entity';
import { environment } from '@env-api/environment';

@Injectable()
export class StatisticService {
	constructor(
		@InjectRepository(OrganizationProject)
		private readonly organizationProjectsRepository: Repository<
			OrganizationProject
		>,
		@InjectRepository(Task)
		private readonly taskRepository: Repository<Task>,
		@InjectRepository(TimeSlot)
		private readonly timeSlotRepository: Repository<TimeSlot>,
		@InjectRepository(Employee)
		private readonly employeeRepository: Repository<Employee>,
		@InjectRepository(Activity)
		private readonly activityRepository: Repository<Activity>,
		@InjectRepository(TimeLog)
		private readonly timeLogRepository: Repository<TimeLog>
	) {}

	async getCounts(request: IGetCountsStatistics): Promise<ICountsStatistics> {
		let start;
		let end;
		if (request.startDate) {
			start = moment(request.startDate).utc().format();
			end = moment(request.endDate).utc().format();
		} else {
			const date = request.date || new Date();
			start = moment.utc(date).startOf('week').format();
			end = moment.utc(date).endOf('week').format();
		}
		const user = RequestContext.currentUser();
		const tenantId = user.tenantId;
		/*
		 *  Get employees id of the organization or get current employee id
		 */
		let employeeIds = [];
		if (
			(user.employeeId && request.onlyMe) ||
			!RequestContext.hasPermission(
				PermissionsEnum.CHANGE_SELECTED_EMPLOYEE
			)
		) {
			employeeIds = [user.employeeId];
		} else {
			employeeIds = await this.getEmployeesIds(
				request.organizationId,
				tenantId
			);
		}

		/*
		 *  Get employees count who worked in this week.
		 */
		const employeesCountQuery = this.employeeRepository.createQueryBuilder();
		employeesCountQuery.innerJoin(
			`${employeesCountQuery.alias}.timeLogs`,
			'timeLogs'
		);
		if (employeeIds.length) {
			employeesCountQuery
				.where({
					id: In(employeeIds)
				})
				.andWhere(`"timeLogs"."startedAt" BETWEEN :start AND :end`, {
					start,
					end
				});
		}
		const employeesCount = await employeesCountQuery
			.andWhere(`"${employeesCountQuery.alias}"."tenantId" = :tenantId`, {
				tenantId
			})
			.getCount();

		/*
		 *  Get projects count who worked in this week.
		 */
		const projectsCountQuery = this.organizationProjectsRepository.createQueryBuilder();
		projectsCountQuery.innerJoin(
			`${projectsCountQuery.alias}.timeLogs`,
			'timeLogs'
		);
		if (employeeIds.length) {
			projectsCountQuery
				.where(`"timeLogs"."employeeId" IN (:...employeeId)`, {
					employeeId: employeeIds
				})
				.andWhere(`"timeLogs"."startedAt" BETWEEN :start AND :end`, {
					start,
					end
				});
		}
		const projectsCount = await projectsCountQuery
			.andWhere(`"${projectsCountQuery.alias}"."tenantId" = :tenantId`, {
				tenantId
			})
			.getCount();

		/*
		 * Get average activity and total duration of the work for the week.
		 */
		let weekActivities = {
			overall: 0,
			duration: 0
		};
		if (employeeIds.length > 0) {
			const activitiesQuery = await this.timeSlotRepository
				.createQueryBuilder()
				.select('AVG(overall)', 'overall')
				.addSelect('SUM(duration)', 'duration')
				.where({
					employeeId: In(employeeIds),
					startedAt: Between(start, end),
					tenantId
				});
			weekActivities = await activitiesQuery.getRawOne();
		}

		/*
		 * Get average activity and total duration of the work for today.
		 */
		let todayActivities = {
			overall: 0,
			duration: 0
		};
		if (employeeIds.length > 0) {
			const activitiesQuery = await this.timeSlotRepository
				.createQueryBuilder()
				.select('AVG(overall)', 'overall')
				.addSelect('SUM(duration)', 'duration')
				.where({
					employeeId: In(employeeIds),
					startedAt: Between(
						moment().startOf('day').format(),
						moment().endOf('day').format()
					),
					tenantId
				});
			todayActivities = await activitiesQuery.getRawOne();
		}

		return {
			employeesCount,
			projectsCount,
			weekActivities: parseFloat(
				parseFloat(weekActivities.overall + '').toFixed(1)
			),
			weekDuration: weekActivities.duration,
			todayActivities: parseFloat(
				parseFloat(todayActivities.overall + '').toFixed(1)
			),
			todayDuration: todayActivities.duration
		};
	}

	async getMembers(request: IGetMembersStatistics) {
		const date = request.date || new Date();
		const start = moment.utc(date).startOf('week').format();
		const end = moment.utc(date).endOf('week').format();
		const tenantId = RequestContext.currentTenantId();

		const query = this.employeeRepository.createQueryBuilder();
		const employees: IMembersStatistics[] = await query
			.select(`"${query.alias}".id`)
			.addSelect(
				`("user"."firstName" || ' ' ||  "user"."lastName")`,
				'user_name'
			)
			.addSelect(`"user"."imageUrl"`, 'user_image_url')
			.addSelect(
				`${
					environment.database.type === 'sqlite'
						? 'SUM((julianday("timeLogs"."stoppedAt") - julianday("timeLogs"."startedAt")) * 86400)'
						: 'SUM(extract(epoch from ("timeLogs"."stoppedAt" - "timeLogs"."startedAt")))'
				}`,
				`duration`
			)
			.innerJoin(`${query.alias}.user`, 'user')
			.innerJoin(`${query.alias}.timeLogs`, 'timeLogs')
			.where(`"${query.alias}"."organizationId" = :organizationId`, {
				organizationId: request.organizationId
			})
			.andWhere(`"${query.alias}"."tenantId" = :tenantId`, { tenantId })
			.andWhere(`"timeLogs"."startedAt" BETWEEN :start AND :end`, {
				start,
				end
			})
			.addGroupBy(`"${query.alias}"."id"`)
			.addGroupBy(`"user"."id"`)
			.orderBy('duration', 'DESC')
			.limit(5)
			.getRawMany();

		if (employees.length > 0) {
			let weekTimeSlots: any = await this.timeSlotRepository
				.createQueryBuilder()
				.select('SUM(duration)', 'duration')
				.addSelect('AVG(overall)', 'overall')
				.addSelect('"employeeId"', 'employeeId')
				.where({
					employeeId: In(_.pluck(employees, 'id')),
					startedAt: Between(start, end),
					tenantId
				})
				.groupBy('"employeeId"')
				.getRawMany();

			weekTimeSlots = _.chain(weekTimeSlots)
				.map((weekTimeSlot: any) => {
					if (weekTimeSlot && weekTimeSlot.overall) {
						weekTimeSlot.overall = parseFloat(
							weekTimeSlot.overall as string
						).toFixed(1);
					}
					return weekTimeSlot;
				})
				.indexBy('employeeId')
				.value();

			let dayTimeSlots: any = await this.timeSlotRepository
				.createQueryBuilder()
				.select('AVG(overall)', 'overall')
				.addSelect('SUM(duration)', 'duration')
				.addSelect('"employeeId"', 'employeeId')
				.where({
					employeeId: In(_.pluck(employees, 'id')),
					startedAt: Between(
						moment().startOf('day').format(),
						moment().endOf('day').format()
					),
					tenantId
				})
				.groupBy('"employeeId"')
				.getRawMany();

			dayTimeSlots = _.chain(dayTimeSlots)
				.map((dayTimeSlot: any) => {
					if (dayTimeSlot && dayTimeSlot.overall) {
						dayTimeSlot.overall = parseFloat(
							dayTimeSlot.overall as string
						).toFixed(1);
					}
					return dayTimeSlot;
				})
				.indexBy('employeeId')
				.value();

			for (let index = 0; index < employees.length; index++) {
				const member = employees[index];

				member.weekTime = weekTimeSlots[member.id];
				member.todayTime = dayTimeSlots[member.id];

				member.user = {
					name: member.user_name,
					imageUrl: member.user_image_url
				};

				delete member.user_name;
				delete member.user_image_url;

				const weekHoursQuery = this.employeeRepository.createQueryBuilder();
				member.weekHours = await weekHoursQuery
					.select(
						`${
							environment.database.type === 'sqlite'
								? 'SUM((julianday("timeLogs"."stoppedAt") - julianday("timeLogs"."startedAt")) * 86400)'
								: 'SUM(extract(epoch from ("timeLogs"."stoppedAt" - "timeLogs"."startedAt")))'
						}`,
						`duration`
					)
					.addSelect(
						`${
							environment.database.type === 'sqlite'
								? `(strftime('%w', timeLogs.startedAt))`
								: 'EXTRACT(DOW FROM "timeLogs"."startedAt")'
						}`,
						'day'
					)
					.where({ id: member.id })
					.andWhere(
						`"timeLogs"."startedAt" BETWEEN :start AND :end`,
						{
							start,
							end
						}
					)
					.andWhere(
						`"${weekHoursQuery.alias}"."tenantId" = :tenantId`,
						{ tenantId }
					)
					.innerJoin(`${weekHoursQuery.alias}.timeLogs`, 'timeLogs')
					.addGroupBy(
						`${
							environment.database.type === 'sqlite'
								? `(strftime('%w', timeLogs.startedAt))`
								: 'EXTRACT(DOW FROM "timeLogs"."startedAt")'
						}`
					)
					.getRawMany();
			}
		}

		return employees;
	}

	async getProjects(request: IGetProjectsStatistics) {
		const query = this.organizationProjectsRepository.createQueryBuilder();
		const date = request.date || new Date();
		const start = moment.utc(date).startOf('week').format();
		const end = moment.utc(date).endOf('week').format();
		const user = RequestContext.currentUser();
		const tenantId = user.tenantId;

		query
			.select(`"${query.alias}".*`)
			.addSelect(
				`${
					environment.database.type === 'sqlite'
						? 'SUM((julianday("timeLogs"."stoppedAt") - julianday("timeLogs"."startedAt")) * 86400)'
						: 'SUM(extract(epoch from ("timeLogs"."stoppedAt" - "timeLogs"."startedAt")))'
				}`,
				`duration`
			)
			.innerJoin(`${query.alias}.timeLogs`, 'timeLogs');

		if (
			(user.employeeId && request.onlyMe) ||
			!RequestContext.hasPermission(
				PermissionsEnum.CHANGE_SELECTED_EMPLOYEE
			)
		) {
			const employeeId = user.employeeId;
			query.leftJoin(`${query.alias}.members`, 'members');
			query.where(`members.id = :employeeId`, { employeeId });
		} else {
			query.where(`"${query.alias}"."organizationId" = :organizationId`, {
				organizationId: request.organizationId
			});
		}

		query
			.andWhere(`"timeLogs"."startedAt" BETWEEN :start AND :end`, {
				start,
				end
			})
			.andWhere(`"${query.alias}"."tenantId" = :tenantId`, {
				tenantId
			})
			.orderBy('duration', 'DESC')
			.addGroupBy(`"${query.alias}"."id"`)
			.limit(5);

		let projects: IProjectsStatistics[] = await query.getRawMany();

		const totalDurationQuery = this.organizationProjectsRepository.createQueryBuilder();
		totalDurationQuery
			.select(
				`${
					environment.database.type === 'sqlite'
						? 'SUM((julianday("timeLogs"."stoppedAt") - julianday("timeLogs"."startedAt")) * 86400)'
						: 'SUM(extract(epoch from ("timeLogs"."stoppedAt" - "timeLogs"."startedAt")))'
				}`,
				`duration`
			)
			.innerJoin(`${query.alias}.timeLogs`, 'timeLogs')
			.where(
				`"${totalDurationQuery.alias}"."organizationId" = :organizationId`,
				{
					organizationId: request.organizationId
				}
			)
			.andWhere(`"${query.alias}"."tenantId" = :tenantId`, {
				tenantId
			});

		if (
			(user.employeeId && request.onlyMe) ||
			!RequestContext.hasPermission(
				PermissionsEnum.CHANGE_SELECTED_EMPLOYEE
			)
		) {
			const employeeId = user.employeeId;
			totalDurationQuery.leftJoin(
				`${totalDurationQuery.alias}.members`,
				'members'
			);
			totalDurationQuery.where(`members.id = :employeeId`, {
				employeeId
			});
		} else {
			totalDurationQuery.where(
				`"${totalDurationQuery.alias}"."organizationId" = :organizationId`,
				{
					organizationId: request.organizationId
				}
			);
		}

		totalDurationQuery.andWhere(
			`"timeLogs"."startedAt" BETWEEN :start AND :end`,
			{
				start,
				end
			}
		);
		const totalDueration = await totalDurationQuery.getRawOne();

		projects = projects.map((project) => {
			project.durationPercentage =
				(project.duration * 100) / totalDueration.duration;
			return project;
		});

		return projects;
	}

	async getTasks(request: IGetTasksStatistics) {
		const date = request.date || new Date();
		const start = moment.utc(date).startOf('week').format();
		const end = moment.utc(date).endOf('week').format();
		const user = RequestContext.currentUser();
		const tenantId = user.tenantId;
		/*
		 *  Get employees id of the orginization or get current employe id
		 */
		let employeeIds = [];
		if (
			(user.employeeId && request.onlyMe) ||
			!RequestContext.hasPermission(
				PermissionsEnum.CHANGE_SELECTED_EMPLOYEE
			)
		) {
			employeeIds = [user.employeeId];
		} else {
			employeeIds = await this.getEmployeesIds(
				request.organizationId,
				tenantId
			);
		}

		if (employeeIds.length > 0) {
			const query = this.taskRepository.createQueryBuilder();
			let tasks = await query
				.innerJoin(`${query.alias}.project`, 'project')
				.select(`"${query.alias}".*`)
				.addSelect(
					`${
						environment.database.type === 'sqlite'
							? 'SUM((julianday("timeLogs"."stoppedAt") - julianday("timeLogs"."startedAt")) * 86400)'
							: 'SUM(extract(epoch from ("timeLogs"."stoppedAt" - "timeLogs"."startedAt")))'
					}`,
					`duration`
				)
				.innerJoin(`${query.alias}.timeLogs`, 'timeLogs')
				.andWhere(`"timeLogs"."employeeId" IN(:...employeeId)`, {
					employeeId: employeeIds
				})
				.andWhere(`"timeLogs"."startedAt" BETWEEN :start AND :end`, {
					start,
					end
				})
				.andWhere(`"${query.alias}"."tenantId" = :tenantId`, {
					tenantId
				})
				.orderBy('duration', 'DESC')
				.addGroupBy(`"${query.alias}"."id"`)
				.limit(5)
				.getRawMany();

			const totalDurationQuery = this.taskRepository.createQueryBuilder();
			const totalDuration = await totalDurationQuery
				.select(
					`${
						environment.database.type === 'sqlite'
							? 'SUM((julianday("timeLogs"."stoppedAt") - julianday("timeLogs"."startedAt")) * 86400)'
							: 'SUM(extract(epoch from ("timeLogs"."stoppedAt" - "timeLogs"."startedAt")))'
					}`,
					`duration`
				)
				.innerJoin(`${totalDurationQuery.alias}.timeLogs`, 'timeLogs')
				.andWhere(`"timeLogs"."employeeId" IN(:...employeeId)`, {
					employeeId: employeeIds
				})
				.andWhere(`"timeLogs"."startedAt" BETWEEN :start AND :end`, {
					start,
					end
				})
				.getRawOne();
			tasks = tasks.map((task) => {
				task.durationPercentage =
					(task.duration * 100) / totalDuration.duration;
				return task;
			});

			return tasks;
		} else {
			return [];
		}
	}

	async manualTimes(request: IGetManualTimesStatistics) {
		const date = request.date || new Date();
		const start = moment.utc(date).startOf('week').format();
		const end = moment.utc(date).endOf('week').format();
		const user = RequestContext.currentUser();
		const tenantId = user.tenantId;
		/*
		 *  Get employees id of the orginization or get current employe id
		 */
		let employeeIds = [];
		if (
			(user.employeeId && request.onlyMe) ||
			!RequestContext.hasPermission(
				PermissionsEnum.CHANGE_SELECTED_EMPLOYEE
			)
		) {
			employeeIds = [user.employeeId];
		} else {
			employeeIds = await this.getEmployeesIds(
				request.organizationId,
				tenantId
			);
		}

		if (employeeIds.length > 0) {
			const timeLogs = await this.timeLogRepository.find({
				relations: ['project', 'employee', 'employee.user'],
				where: {
					employeeId: In(employeeIds),
					logType: TimeLogType.MANUAL,
					startedAt: Between(start, end),
					tenantId
				},
				take: 5,
				order: {
					startedAt: 'DESC'
				}
			});

			const mapedTimeLogs: IManualTimesStatistics[] = timeLogs.map(
				(timeLog) => {
					return {
						id: timeLog.id,
						startedAt: timeLog.startedAt,
						duration: timeLog.duration,
						user: _.pick(timeLog.employee.user, [
							'name',
							'imageUrl'
						]),
						project: _.pick(timeLog.employee.user, ['name'])
					} as IManualTimesStatistics;
				}
			);
			return mapedTimeLogs;
		} else {
			return [];
		}
	}

	async getActivites(request: IGetActivitiesStatistics) {
		const date = request.date || new Date();
		const start = moment.utc(date).startOf('week').format();
		const end = moment.utc(date).endOf('week').format();
		const user = RequestContext.currentUser();
		const tenantId = user.tenantId;

		/*
		 *  Get employees id of the orginization or get current employe id
		 */
		let employeeIds = [];
		if (
			(user.employeeId && request.onlyMe) ||
			!RequestContext.hasPermission(
				PermissionsEnum.CHANGE_SELECTED_EMPLOYEE
			)
		) {
			employeeIds = [user.employeeId];
		} else {
			employeeIds = await this.getEmployeesIds(
				request.organizationId,
				tenantId
			);
		}

		if (employeeIds.length > 0) {
			const query = this.activityRepository.createQueryBuilder();
			query
				.select(`COUNT("${query.alias}"."id")`, `sessions`)
				.addSelect(`SUM("${query.alias}"."duration")`, `duration`)
				.addSelect(`"${query.alias}"."title"`, `title`)
				.addGroupBy(`"${query.alias}"."title"`)
				.andWhere(`"${query.alias}"."date" BETWEEN :start AND :end`, {
					start,
					end
				})
				.andWhere(`"${query.alias}"."employeeId" IN(:...employeeId)`, {
					employeeId: employeeIds
				})
				.andWhere(`"${query.alias}"."tenantId" = :tenantId`, {
					tenantId
				})
				.orderBy(`"duration"`, 'DESC')
				.limit(5);

			let activities: IActivitiesStatistics[] = await query.getRawMany();

			/*
			 * Fetch total duration of the week for calculate duration percentage
			 */
			const totalDurationQuery = this.activityRepository.createQueryBuilder();
			const totalDueration = await totalDurationQuery
				.select(
					`SUM("${totalDurationQuery.alias}"."duration")`,
					`duration`
				)
				.andWhere(
					`"${totalDurationQuery.alias}"."employeeId" IN(:...employeeId)`,
					{
						employeeId: employeeIds
					}
				)
				.andWhere(`"${query.alias}"."date" BETWEEN :start AND :end`, {
					start,
					end
				})
				.andWhere(`"${query.alias}"."tenantId" = :tenantId`, {
					tenantId
				})
				.getRawOne();

			activities = activities.map((activity) => {
				activity.durationPercentage =
					(activity.duration * 100) / totalDueration.duration;
				return activity;
			});

			return activities;
		} else {
			return [];
		}
	}

	async getEmployeeTimeSlots(request: IGetTimeSlotStatistics) {
		let employees: ITimeSlotStatistics[] = [];

		const date = request.date || new Date();
		const start = moment.utc(date).startOf('week').format();
		const end = moment.utc(date).endOf('week').format();
		const user = RequestContext.currentUser();
		const tenantId = user.tenantId;

		const query = this.employeeRepository.createQueryBuilder();
		query
			.select(`"${query.alias}".*`)
			.addSelect('MAX(timeLogs.startedAt)', 'startedAt')
			.addSelect(
				`("user"."firstName" || ' ' ||  "user"."lastName")`,
				'user_name'
			)
			.addSelect(`"user"."imageUrl"`, 'user_image_url')
			.innerJoin(`${query.alias}.timeLogs`, 'timeLogs')
			.innerJoin(`${query.alias}.user`, 'user')
			.andWhere(`"timeLogs"."startedAt" BETWEEN :start AND :end`, {
				start,
				end
			})
			.groupBy(`"${query.alias}".id`)
			.addGroupBy('user.id')
			.orderBy('"startedAt"', 'DESC')
			.limit(3);

		if (
			(user.employeeId && request.onlyMe) ||
			!RequestContext.hasPermission(
				PermissionsEnum.CHANGE_SELECTED_EMPLOYEE
			)
		) {
			const employeeId = user.employeeId;
			query.andWhere(`"${query.alias}".id = :employeeId`, { employeeId });
		} else {
			query.andWhere(
				`"${query.alias}"."organizationId" = :organizationId`,
				{
					organizationId: request.organizationId
				}
			);
		}

		employees = await query
			.andWhere(`"${query.alias}"."tenantId" = :tenantId`, {
				tenantId
			})
			.getRawMany();

		for (let index = 0; index < employees.length; index++) {
			const employee = employees[index];
			employee.user = {
				imageUrl: employee.user_image_url,
				name: employee.user_name
			};
			delete employee.user_image_url;
			delete employee.user_name;

			employee.timeSlots = await this.timeSlotRepository.find({
				relations: ['screenshots'],
				where: {
					employeeId: employee.id,
					tenantId
				},
				take: 3,
				order: {
					startedAt: 'DESC'
				}
			});
		}
		return employees;
	}

	private async getEmployeesIds(organizationId: string, tenantId: string) {
		const employees = await this.employeeRepository
			.createQueryBuilder()
			.select(['id'])
			.andWhere('"organizationId" = :organizationId', { organizationId })
			.andWhere('"tenantId" = :tenantId', { tenantId })
			.getRawMany();
		return _.pluck(employees, 'id');
	}
}
