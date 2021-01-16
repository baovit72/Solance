import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
	FeatureEnum,
	IOrganization,
	IUser,
	PermissionsEnum
} from '@gauzy/models';
import { NbMenuItem } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { Store } from '../@core/services/store.service';
import { SelectorService } from '../@core/utils/selector.service';
import { EmployeesService, UsersService } from '../@core/services';
import { NgxPermissionsService } from 'ngx-permissions';
import { ReportService } from './reports/all-report/report.server';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { chain } from 'underscore';
import { AuthStrategy } from '../@core/auth/auth-strategy.service';

interface GaMenuItem extends NbMenuItem {
	data: {
		translationKey: string; //Translation key for the title, mandatory for all items
		permissionKeys?: PermissionsEnum[]; //Check permissions and hide item if any given permission is not present
		featureKey?: FeatureEnum; //Check permissions and hide item if any given permission is not present
		withOrganizationShortcuts?: boolean; //Declare if the sidebar item has organization level shortcuts
		hide?: () => boolean; //Hide the menu item if this returns true
	};
}
@UntilDestroy()
@Component({
	selector: 'ngx-pages',
	styleUrls: ['pages.component.scss'],
	template: `
		<ngx-one-column-layout *ngIf="!!menu && user">
			<nb-menu [items]="menu"></nb-menu>
			<router-outlet></router-outlet>
		</ngx-one-column-layout>
	`
})
export class PagesComponent implements OnInit, OnDestroy {
	basicMenu: GaMenuItem[];
	adminMenu: GaMenuItem[];
	isAdmin: boolean;
	isEmployee: boolean;
	_selectedOrganization: IOrganization;
	user: IUser;
	menu: NbMenuItem[] = [];
	reportMenuItems: NbMenuItem[];

	constructor(
		private employeeService: EmployeesService,
		public translate: TranslateService,
		private store: Store,
		private reportService: ReportService,
		private selectorService: SelectorService,
		private router: Router,
		private ngxPermissionsService: NgxPermissionsService,
		private readonly usersService: UsersService,
		private readonly authStrategy: AuthStrategy
	) {}

	getMenuItems(): GaMenuItem[] {
		return [
			{
				title: 'Tasks',
				icon: 'browser-outline',
				link: '/pages/tasks/dashboard',
				data: {
					translationKey: 'MENU.TASKS',
					featureKey: FeatureEnum.FEATURE_DASHBOARD_TASK
				}
			},
			{
				title: 'My Tasks',
				icon: 'person-outline',
				link: '/pages/tasks/me',
				data: {
					translationKey: 'MENU.MY_TASKS',
					hide: () => !this.isEmployee,
					featureKey: FeatureEnum.FEATURE_MY_TASK
				}
			},
			{
				title: 'Employees',

				icon: 'people-outline',
				link: '/pages/employees',
				data: {
					hide: () => this.isEmployee,
					translationKey: 'MENU.EMPLOYEES',
					permissionKeys: [
						PermissionsEnum.ORG_EMPLOYEES_VIEW
					],
					featureKey: FeatureEnum.FEATURE_EMPLOYEES
				}
			},
			{
				title: 'Projects',
				icon: 'book-outline',
				link: `/pages/organization/projects`,
				data: {
					hide: () => this.isEmployee,
					translationKey: 'ORGANIZATIONS_PAGE.PROJECTS',
					permissionKeys: [PermissionsEnum.ALL_ORG_EDIT],
					featureKey: FeatureEnum.FEATURE_ORGANIZATION_PROJECT
				}
			},
			{
				title: 'Clients',
				icon: 'book-open-outline',
				link: `/pages/contacts/clients`,
				data: {
					translationKey: 'CONTACTS_PAGE.CLIENTS'
				}
			},
			{
				title: 'Goals', 
				link: '/pages/goals',
				icon: 'list-outline',
				data: {
					translationKey: 'MENU.GOALS',
					featureKey: FeatureEnum.FEATURE_GOAL
				}
			},
			{
				title: 'Admin',
				group: true,
				data: {
					hide: () => this.isEmployee,
					translationKey: 'MENU.ADMIN',
					permissionKeys: [
						PermissionsEnum.ORG_EMPLOYEES_VIEW,
						PermissionsEnum.ORG_USERS_VIEW,
						PermissionsEnum.ALL_ORG_EDIT,
						PermissionsEnum.ALL_ORG_VIEW
					]
				}
			},
			{
				title: 'Users',
				icon: 'people-outline',
				link: '/pages/users',
				data: {
					hide: () => this.isEmployee,
					translationKey: 'MENU.USERS',
					permissionKeys: [
						PermissionsEnum.ALL_ORG_VIEW,
						PermissionsEnum.ORG_USERS_VIEW
					],
					featureKey: FeatureEnum.FEATURE_USER
				}
			},
			{
				title: 'Organizations',
				icon: 'globe-outline',
				link: '/pages/organizations',
				data: {
					hide: () => this.isEmployee,
					translationKey: 'MENU.ORGANIZATIONS',
					permissionKeys: [
						PermissionsEnum.ALL_ORG_VIEW,
						PermissionsEnum.ORG_EXPENSES_EDIT
					],
					featureKey: FeatureEnum.FEATURE_ORGANIZATIONS
				}
			}
		];
	}

	async ngOnInit() {
		this._createEntryPoint();
		this._applyTranslationOnSmartTable();
		this.store.selectedOrganization$
			.pipe(
				filter((organization) => !!organization),
				untilDestroyed(this)
			)
			.subscribe(async (org) => {
				this._selectedOrganization = org;
				await this.checkForEmployee();
				if (org) {
					await this.reportService.getReportMenuItems({
						organizationId: org.id
					});
				}
				this.loadItems(
					this.selectorService.showSelectors(this.router.url)
						.showOrganizationShortcuts
				);
			});
		this.store.userRolePermissions$
			.pipe(
				filter((permissions) => permissions.length > 0),
				untilDestroyed(this)
			)
			.subscribe((data) => {
				const permissions = data.map(({ permission }) => permission);
				this.ngxPermissionsService.loadPermissions(permissions);
				this.loadItems(
					this.selectorService.showSelectors(this.router.url)
						.showOrganizationShortcuts
				);
			});
		this.router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.pipe(untilDestroyed(this))
			.subscribe((e) => {
				this.loadItems(
					this.selectorService.showSelectors(e['url'])
						.showOrganizationShortcuts
				);
			});
		this.reportService.menuItems$
			.pipe(untilDestroyed(this))
			.subscribe((menuItems) => {
				if (menuItems) {
					this.reportMenuItems = chain(menuItems)
						.values()
						.map((item) => {
							return {
								title: item.name,
								link: `/pages/reports/${item.slug}`,
								icon: item.iconClass,
								data: {
									translationKey: `${item.name}`
								}
							};
						})
						.value();
				} else {
					this.reportMenuItems = [];
				}

				this.menu = this.getMenuItems();
				this.loadItems(
					this.selectorService.showSelectors(this.router.url)
						.showOrganizationShortcuts
				);
			});
		this.store.featureOrganizations$
			.pipe(untilDestroyed(this))
			.subscribe(() => {
				this.loadItems(
					this.selectorService.showSelectors(this.router.url)
						.showOrganizationShortcuts
				);
			});
		this.store.featureTenant$.pipe(untilDestroyed(this)).subscribe(() => {
			this.loadItems(
				this.selectorService.showSelectors(this.router.url)
					.showOrganizationShortcuts
			);
		});
		this.menu = this.getMenuItems();
	}

	/*
	 * This is app entry point after login
	 */
	private async _createEntryPoint() {
		const id = this.store.userId;
		if (!id) return;

		this.user = await this.usersService.getMe([
			'employee',
			'role',
			'role.rolePermissions',
			'tenant',
			'tenant.featureOrganizations',
			'tenant.featureOrganizations.feature'
		]);

		this.authStrategy.electronAuthentication({
			user: this.user,
			token: this.store.token
		});

		//When a new user registers & logs in for the first time, he/she does not have tenantId.
		//In this case, we have to redirect the user to the onboarding page to create their first organization, tenant, role.
		if (!this.user.tenantId) {
			this.router.navigate(['/onboarding/tenant']);
			return;
		}

		this.store.user = this.user;

		//tenant enabled/disabled features for relatives organizations
		const { tenant } = this.user;
		this.store.featureTenant = tenant.featureOrganizations.filter(
			(item) => !item.organizationId
		);

		//only enabled permissions assign to logged in user
		this.store.userRolePermissions = this.user.role.rolePermissions.filter(
			(permission) => permission.enabled
		);
	}

	loadItems(withOrganizationShortcuts: boolean) {
		this.menu.forEach((item) => {
			this.refreshMenuItem(item, withOrganizationShortcuts);
		});
	}

	refreshMenuItem(item, withOrganizationShortcuts) {
		item.title = this.getTranslation(item.data.translationKey);
		if (item.data.permissionKeys || item.data.hide) {
			const anyPermission = item.data.permissionKeys
				? item.data.permissionKeys.reduce((permission, key) => {
						return this.store.hasPermission(key) || permission;
				  }, false)
				: true;

			item.hidden =
				!anyPermission || (item.data.hide && item.data.hide());

			if (anyPermission && item.data.organizationShortcut) {
				item.hidden =
					!withOrganizationShortcuts || !this._selectedOrganization;
				if (!item.hidden) {
					item.link =
						item.data.urlPrefix +
						this._selectedOrganization.id +
						item.data.urlPostfix;
				}
			}
		}

		// enabled/disabled features from here
		if (item.data.hasOwnProperty('featureKey')) {
			const { featureKey } = item.data;
			const enabled = !this.store.hasFeatureEnabled(featureKey);
			item.hidden = enabled || (item.data.hide && item.data.hide());
		}

		if (item.children) {
			item.children.forEach((childItem) => {
				this.refreshMenuItem(childItem, withOrganizationShortcuts);
			});
		}
	}

	async checkForEmployee() {
		const { tenantId } = this.store.user;
		this.isEmployee = (
			await this.employeeService.getEmployeeByUserId(
				this.store.userId,
				[],
				{ tenantId }
			)
		).success;
	}

	getTranslation(prefix: string) {
		let result = prefix;
		this.translate.get(prefix).subscribe((res) => {
			result = res;
		});
		return result;
	}

	private _applyTranslationOnSmartTable() {
		this.translate.onLangChange.pipe(untilDestroyed(this)).subscribe(() => {
			this.loadItems(
				this.selectorService.showSelectors(this.router.url)
					.showOrganizationShortcuts
			);
		});
	}

	ngOnDestroy() {}
}
