import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HubstaffService } from 'apps/gauzy/src/app/@core/services/hubstaff.service';
import {
	PersistQuery,
	PersistStore,
	Store
} from 'apps/gauzy/src/app/@core/services/store.service';
import { IOrganization } from '@gauzy/models';

@Component({
	selector: 'ngx-hubstaff-authorize',
	templateUrl: './hubstaff-authorize.component.html',
	styleUrls: ['./hubstaff-authorize.component.scss']
})
export class HubstaffAuthorizeComponent implements OnInit, OnDestroy {
	private _ngDestroy$: Subject<void> = new Subject();
	authorizeForm: FormGroup;
	clientSecretForm: FormGroup;
	hubStaffAppCode: string;
	rememberState: boolean;
	organization: IOrganization;

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _hubstaffService: HubstaffService,
		private fb: FormBuilder,
		private _router: Router,
		private _storeService: Store,
		private _persistStore: PersistStore,
		private _persistQuery: PersistQuery
	) {}

	ngOnInit() {
		this._storeService.selectedOrganization$
			.pipe(
				filter((organization) => !!organization),
				takeUntil(this._ngDestroy$)
			)
			.subscribe((organization: IOrganization) => {
				this.organization = organization;
				this._persistStore.update({
					organizationId: this.organization.id
				});
			});
		this._initializeForms();
		this._getHubstaffCode();
	}

	private _initializeForms() {
		this.authorizeForm = this.fb.group({
			client_id: ['', Validators.required]
		});
		this.clientSecretForm = this.fb.group({
			client_secret: ['', Validators.required]
		});
	}

	private _getHubstaffCode() {
		this._activatedRoute.queryParams
			.pipe(
				filter(({ code }) => code),
				tap(({ code }) => (this.hubStaffAppCode = code)),
				takeUntil(this._ngDestroy$)
			)
			.subscribe();

		if (!this.hubStaffAppCode) {
			this.subscribeRouteData();
		}
	}

	private subscribeRouteData() {
		this._activatedRoute.data
			.pipe(takeUntil(this._ngDestroy$))
			.subscribe((data: any) => {
				if (data.hasOwnProperty('state')) {
					this.rememberState = data['state'];
					// if remember state is true
					if (this.rememberState) {
						this._checkRemeberState();
					}
				}
			});
	}

	/**
	 * Hubstaff integration remember state API call
	 */
	private _checkRemeberState() {
		const { organizationId } = this._persistQuery.getValue();
		this._hubstaffService
			.checkRemeberState(organizationId)
			.pipe(
				tap((res) => {
					if (res.success) {
						const { record } = res;
						this._redirectToHubstaffIntegration(record.id);
					}
				}),
				takeUntil(this._ngDestroy$)
			)
			.subscribe();
	}

	/**
	 * Hubstaff integration remember state API call
	 */
	private _redirectToHubstaffIntegration(integrationId) {
		this._router.navigate(['pages/integrations/hubstaff', integrationId]);
	}

	authorizeHubstaff() {
		const { client_id } = this.authorizeForm.value;
		this._persistStore.update({
			clientId: client_id
		});
		this._hubstaffService.authorizeClient(client_id);
	}

	addIntegration() {
		const { client_secret } = this.clientSecretForm.value;
		const { clientId, organizationId } = this._persistQuery.getValue();

		this._hubstaffService
			.addIntegration({
				code: this.hubStaffAppCode,
				client_secret,
				clientId,
				organizationId
			})
			.pipe(
				tap(({ id }) => {
					this._redirectToHubstaffIntegration(id);
				}),
				takeUntil(this._ngDestroy$)
			)
			.subscribe();
	}

	ngOnDestroy() {
		this._persistStore.update({
			organizationId: null,
			clientId: null
		});
		this._ngDestroy$.next();
		this._ngDestroy$.complete();
	}
}
