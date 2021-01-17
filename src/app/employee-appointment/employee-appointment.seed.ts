import { Connection } from 'typeorm';
import { Tenant } from '../tenant/tenant.entity';
import { IEmployee, IOrganization } from '@gauzy/models';
import { EmployeeAppointment } from './employee-appointment.entity';
import * as faker from 'faker';
import * as moment from 'moment';
import { AppointmentEmployee } from '../appointment-employees/appointment-employees.entity';
import { AGENDAS } from './default-employee-appointment';

export const createDefaultEmployeeAppointment = async (
	connection: Connection,
	tenant: Tenant,
	employees: IEmployee[],
	organizations
): Promise<EmployeeAppointment[]> => {
	if (!employees) {
		console.warn(
			'Warning: Employees not found, Default Employee Appointment  will not be created'
		);
		return;
	}
	if (!organizations) {
		console.warn(
			'Warning: tenantOrganizations not found, Default Employee Appointment  will not be created'
		);
		return;
	}

	let employeesAppointments: EmployeeAppointment[] = [];
	for (const employee of employees) {
		employeesAppointments = await dataOperation(
			connection,
			employeesAppointments,
			employee,
			[organizations],
			tenant
		);
	}
	await connection.manager.save(employeesAppointments);
};

export const createRandomEmployeeAppointment = async (
	connection: Connection,
	tenants: Tenant[],
	tenantEmployeeMap: Map<Tenant, IEmployee[]>,
	tenantOrganizationsMap: Map<Tenant, IOrganization[]>
): Promise<EmployeeAppointment[]> => {
	if (!tenantEmployeeMap) {
		console.warn(
			'Warning: tenantEmployeeMap not found, Employee Appointment  will not be created'
		);
		return;
	}
	if (!tenantOrganizationsMap) {
		console.warn(
			'Warning: tenantOrganizationsMap not found, Employee Appointment  will not be created'
		);
		return;
	}

	let employeesAppointments: EmployeeAppointment[] = [];

	for (const tenant of tenants) {
		const tenantEmployees = tenantEmployeeMap.get(tenant);
		const tenantOrgs = tenantOrganizationsMap.get(tenant);

		for (const tenantEmployee of tenantEmployees) {
			employeesAppointments = await dataOperation(
				connection,
				employeesAppointments,
				tenantEmployee,
				tenantOrgs,
				tenant
			);
		}
	}
};

const dataOperation = async (
	connection: Connection,
	employeesAppointments,
	tenantEmployee,
	organizations,
	tenant
) => {
	for (const organization of organizations) {
		const employeesAppointment = new EmployeeAppointment();

		const invitees = await connection.manager.find(AppointmentEmployee, {
			where: [{ employeeId: tenantEmployee.id }]
		});

		employeesAppointment.employee = tenantEmployee;
		employeesAppointment.organization = organization;
		employeesAppointment.description = faker.name.jobDescriptor();
		employeesAppointment.location = faker.address.city();
		employeesAppointment.startDateTime = faker.date.between(
			new Date(),
			moment(new Date()).add(2, 'months').toDate()
		);
		employeesAppointment.endDateTime = moment(
			employeesAppointment.startDateTime
		)
			.add(1, 'hours')
			.toDate();
		employeesAppointment.invitees = invitees;
		employeesAppointment.agenda = faker.random.arrayElement(AGENDAS);
		employeesAppointment.tenant = tenant;
		employeesAppointments.push(employeesAppointment);
	}

	await connection.manager.save(employeesAppointments);
	return employeesAppointments;
};
