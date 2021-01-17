import { environment as env } from '@env-api/environment';
import { Injectable } from '@nestjs/common';
import { use } from 'passport';
import { AuthService } from './auth.service';

const FacebookTokenStrategy = require('passport-facebook-token');

@Injectable()
export class FacebookStrategy {
	constructor(private readonly _authService: AuthService) {
		this.init();
	}

	private init(): void {
		const { clientId, clientSecret, oauthRedirectUri } = env.facebookConfig;
		use(
			'facebook',
			new FacebookTokenStrategy(
				{
					clientID: clientId || 'disabled',
					clientSecret: clientSecret || 'disabled',
					callbackURL: oauthRedirectUri,
					profileFields: ['email']
				},
				async (
					accessToken: string,
					refreshToken: string,
					profile: any,
					done: Function
				) => {
					const { emails } = profile;

					try {
						const {
							success,
							authData
						} = await this._authService.validateOAuthLoginEmail(
							emails
						);

						const user = { success, authData };

						done(null, user);
					} catch (err) {
						done(err, false);
					}
				}
			)
		);
	}
}
