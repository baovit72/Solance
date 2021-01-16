"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PagesRoutingModule = void 0;
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var pages_component_1 = require("./pages.component");
var not_found_component_1 = require("./miscellaneous/not-found/not-found.component");
var routes = [
    {
        path: '',
        component: pages_component_1.PagesComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./dashboard/dashboard.module'); }).then(function (m) { return m.DashboardModule; });
                }
            },
            // {
            //     path: 'accounting',
            //     children: [
            //         {
            //             path: '',
            //             redirectTo: 'invoices',
            //             pathMatch: 'full'
            //         },
            //         {
            //             path: 'income',
            //             loadChildren: function () {
            //                 return Promise.resolve().then(function () { return require('./income/income.module'); }).then(function (m) { return m.IncomeModule; });
            //             }
            //         },
            //         {
            //             path: 'expenses',
            //             loadChildren: function () {
            //                 return Promise.resolve().then(function () { return require('./expenses/expenses.module'); }).then(function (m) { return m.ExpensesModule; });
            //             }
            //         },
            //         {
            //             path: 'invoices',
            //             loadChildren: function () {
            //                 return Promise.resolve().then(function () { return require('./invoices/invoices.module'); }).then(function (m) { return m.InvoicesModule; });
            //             }
            //         },
            //         {
            //             path: 'payments',
            //             loadChildren: function () {
            //                 return Promise.resolve().then(function () { return require('./payments/payments.module'); }).then(function (m) { return m.PaymentsModule; });
            //             }
            //         }
            //     ]
            // },
            {
                path: 'contacts',
                children: [
                    {
                        path: 'visitors',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./work-in-progress/work-in-progress.module'); }).then(function (m) { return m.WorkInProgressModule; });
                        }
                    },
                    {
                        path: '',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./contacts/contact.module'); }).then(function (m) { return m.ContactModule; });
                        }
                    }
                ]
            },
            {
                path: 'projects',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./work-in-progress/work-in-progress.module'); }).then(function (m) { return m.WorkInProgressModule; });
                }
            },
            {
                path: 'tasks',
                children: [
                    {
                        path: '',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./tasks/tasks.module'); }).then(function (m) { return m.TasksModule; });
                        }
                    }
                ]
            },
            {
                path: 'jobs',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./jobs/jobs.module'); }).then(function (m) { return m.JobsModule; });
                }
            },
            {
                path: 'sales',
                children: [
                    {
                        path: 'proposals',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./proposals/proposals.module'); }).then(function (m) { return m.ProposalsModule; });
                        }
                    },
                    {
                        path: 'estimates',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./work-in-progress/work-in-progress.module'); }).then(function (m) { return m.WorkInProgressModule; });
                        }
                    },
                    {
                        path: 'invoices',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./invoices/invoices.module'); }).then(function (m) { return m.InvoicesModule; });
                        }
                    },
                    {
                        path: 'payments',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./payments/payments.module'); }).then(function (m) { return m.PaymentsModule; });
                        }
                    },
                    {
                        path: 'pipelines',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./pipelines/pipelines.module'); }).then(function (m) { return m.PipelinesModule; });
                        }
                    }
                ]
            },
            {
                path: 'employees',
                children: [
                    {
                        path: '',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./employees/employees.module'); }).then(function (m) { return m.EmployeesModule; });
                        }
                    },
                    {
                        path: 'activity',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./work-in-progress/work-in-progress.module'); }).then(function (m) { return m.WorkInProgressModule; });
                        }
                    },
                    {
                        path: 'timesheets',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./work-in-progress/work-in-progress.module'); }).then(function (m) { return m.WorkInProgressModule; });
                        }
                    },
                    {
                        path: 'schedules',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./employees/schedules/schedule.module'); }).then(function (m) { return m.ScheduleModule; });
                        }
                    },
                    {
                        path: 'appointments',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./employees/appointment/appointment.module'); }).then(function (m) { return m.AppointmentModule; });
                        }
                    },
                    {
                        path: 'event-types',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./employees/event-types/event-type.module'); }).then(function (m) { return m.EventTypeModule; });
                        }
                    },
                    {
                        path: 'time-off',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./time-off/time-off.module'); }).then(function (m) { return m.TimeOffModule; });
                        }
                    },
                    {
                        path: 'approvals',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./approvals/approvals.module'); }).then(function (m) { return m.ApprovalsModule; });
                        }
                    },
                    {
                        path: 'positions',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./positions/positions.module'); }).then(function (m) { return m.PositionsModule; });
                        }
                    },
                    {
                        path: 'employee-level',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./employee-levels/employee-level.module'); }).then(function (m) { return m.EmployeeLevelModule; });
                        }
                    },
                    {
                        path: 'recurring-expenses',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./recurring-expense-employee/recurring-expense-employee.module'); }).then(function (m) { return m.RecurringExpensesEmployeeModule; });
                        }
                    },
                    {
                        path: 'candidates',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./candidates/candidates.module'); }).then(function (m) { return m.CandidatesModule; });
                        }
                    }
                ]
            },
            {
                path: 'organization',
                children: [
                    {
                        path: 'equipment',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./equipment/equipment.module'); }).then(function (m) { return m.EquipmentModule; });
                        }
                    },
                    {
                        path: 'inventory',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./inventory/inventory.module'); }).then(function (m) { return m.InventoryModule; });
                        }
                    },
                    {
                        path: 'tags',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./tags/tags.module'); }).then(function (m) { return m.TagsModule; });
                        }
                    },
                    {
                        path: 'expense-recurring',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./expense-recurring/expense-recurring.module'); }).then(function (m) { return m.ExpenseRecurringModule; });
                        }
                    },
                    {
                        path: 'help-center',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./help-center/help-center.module'); }).then(function (m) { return m.HelpCenterModule; });
                        }
                    },
                    {
                        path: 'approval-policy',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./approval-policy/approval-policy.module'); }).then(function (m) { return m.ApprovalPolicyModule; });
                        }
                    },
                    {
                        path: 'equipment-sharing',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./equipment-sharing/equipment-sharing.module'); }).then(function (m) { return m.EquipmentSharingModule; });
                        }
                    },
                    {
                        path: 'equipment-sharing-policy',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./equipment-sharing-policy/equipment-sharing-policy.module'); }).then(function (m) { return m.EquipmentSharingPolicyModule; });
                        }
                    },
                    {
                        path: 'documents',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./documents/documents.module'); }).then(function (m) { return m.DocumentsModule; });
                        }
                    },
                    {
                        path: 'employment-types',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./employment-types/employment-types.module'); }).then(function (m) { return m.EmploymentTypesModule; });
                        }
                    },
                    {
                        path: 'vendors',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./vendors/vendors.module'); }).then(function (m) { return m.VendorsModule; });
                        }
                    },
                    {
                        path: 'departments',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./departments/departments.module'); }).then(function (m) { return m.DepartmentsModule; });
                        }
                    },
                    {
                        path: 'projects',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./projects/projects.module'); }).then(function (m) { return m.ProjectsModule; });
                        }
                    },
                    {
                        path: 'teams',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./teams/teams.module'); }).then(function (m) { return m.TeamsModule; });
                        }
                    }
                ]
            },
            {
                path: 'goals',
                children: [
                    {
                        path: '',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./goals/goals.module'); }).then(function (m) { return m.GoalsModule; });
                        }
                    },
                    {
                        path: 'reports',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./work-in-progress/work-in-progress.module'); }).then(function (m) { return m.WorkInProgressModule; });
                        }
                    },
                    {
                        path: 'settings',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./goal-settings/goal-settings.module'); }).then(function (m) { return m.GoalSettingsModule; });
                        }
                    }
                ]
            },
            {
                path: 'reports',
                children: [
                    {
                        path: '',
                        redirectTo: 'all',
                        pathMatch: 'full'
                    },
                    {
                        path: 'all',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./reports/all-report/all-report.module'); }).then(function (m) { return m.AllReportModule; });
                        }
                    },
                    {
                        path: 'time-activity',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./reports/time-reports/time-reports.module'); }).then(function (m) { return m.TimeReportsModule; });
                        }
                    },
                    {
                        path: 'weekly',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./reports/weekly-time-reports/weekly-time-reports.module'); }).then(function (m) { return m.WeeklyTimeReportsModule; });
                        }
                    },
                    {
                        path: 'apps-urls',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./reports/apps-urls-report/apps-urls-report.module'); }).then(function (m) { return m.AppsUrlsReportModule; });
                        }
                    },
                    {
                        path: 'manual-time-edits',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./reports/manual-time/manual-time.module'); }).then(function (m) { return m.ManualTimeModule; });
                        }
                    },
                    {
                        path: 'accounting',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./work-in-progress/work-in-progress.module'); }).then(function (m) { return m.WorkInProgressModule; });
                        }
                    },
                    {
                        path: 'expense',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./reports/expenses-report/expenses-report.module'); }).then(function (m) { return m.ExpensesReportModule; });
                        }
                    },
                    {
                        path: 'payments',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./reports/payment-report/payment-report.module'); }).then(function (m) { return m.PaymentReportModule; });
                        }
                    },
                    {
                        path: 'amounts-owed',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./reports/amounts-owed-report/amounts-owed-report.module'); }).then(function (m) { return m.AmountsOwedReportModule; });
                        }
                    },
                    {
                        path: 'weekly-limits',
                        data: {
                            duration: 'week',
                            title: 'REPORT_PAGE.WEEKLY_LIMIT_REPORT'
                        },
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./reports/time-limit-report/time-limit-report.module'); }).then(function (m) { return m.TimeLimitReportModule; });
                        }
                    },
                    {
                        path: 'daily-limits',
                        data: {
                            duration: 'day',
                            title: 'REPORT_PAGE.DAILY_LIMIT_REPORT'
                        },
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./reports/time-limit-report/time-limit-report.module'); }).then(function (m) { return m.TimeLimitReportModule; });
                        }
                    },
                    {
                        path: 'project-budgets',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./reports/project-budgets-report/project-budgets-report.module'); }).then(function (m) { return m.ProjectBudgetsReportModule; });
                        }
                    },
                    {
                        path: 'client-budgets',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./reports/client-budgets-report/client-budgets-report.module'); }).then(function (m) { return m.ClientBudgetsReportModule; });
                        }
                    },
                    {
                        path: '*',
                        component: not_found_component_1.NotFoundComponent
                    }
                ]
            },
            {
                path: 'help',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./help/help.module'); }).then(function (m) { return m.HelpModule; });
                }
            },
            {
                path: 'about',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./about/about.module'); }).then(function (m) { return m.AboutModule; });
                }
            },
            {
                path: 'integrations',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./integrations/integrations.module'); }).then(function (m) { return m.IntegrationsModule; });
                }
            },
            {
                path: 'candidates',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./candidates/candidates.module'); }).then(function (m) { return m.CandidatesModule; });
                }
                // canActivate: [RoleGuard],
                // data: { expectedRole: [RolesEnum.ADMIN] }
            },
            {
                path: 'users',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./users/users.module'); }).then(function (m) { return m.UsersModule; });
                }
            },
            {
                path: 'organizations',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./organizations/organizations.module'); }).then(function (m) { return m.OrganizationsModule; });
                }
            },
            {
                path: 'auth',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./auth/auth.module'); }).then(function (m) { return m.AuthModule; });
                }
            },
            {
                path: 'settings',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./settings/settings.module'); }).then(function (m) { return m.SettingsModule; });
                }
            },
            {
                path: 'legal',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./legal/legal.module'); }).then(function (m) { return m.PageLegalModule; });
                }
            },
            {
                path: '**',
                component: not_found_component_1.NotFoundComponent
            }
        ]
    }
];
var PagesRoutingModule = /** @class */ (function () {
    function PagesRoutingModule() {
    }
    PagesRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], PagesRoutingModule);
    return PagesRoutingModule;
}());
exports.PagesRoutingModule = PagesRoutingModule;
