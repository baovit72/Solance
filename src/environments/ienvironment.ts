// Modified code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IFacebookConfig } from './IFacebookConfig';
import { IGoogleConfig } from './IGoogleConfig';
import { IUpworkConfig } from './IUpworkConfig';
import { IGithubConfig } from './IGithubConfig';
import { IMicrosoftConfig } from './IMicrosoftConfig';
import { ILinkedinConfig } from './ILinkedinIConfig';
import { ITwitterConfig } from './ITwitterConfig';
import { IFiverrConfig } from './IFiverrConfig';
import { IKeycloakConfig } from './IKeycloakConfig';
import { IAuth0Config } from './IAuth0Config';
import { AWSConfig } from './AWSConfig';
import { ISMTPConfig } from './ISMTPConfig';
import { FileStorageProviderEnum } from '@gauzy/models';
import { IUnleashConfig } from './IUnleashConfig';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * environment variables that goes into process.env
 */
export interface Env {
	LOG_LEVEL?: LogLevel;
	[key: string]: string;
}

export interface FileSystem {
	name: FileStorageProviderEnum;
}
export interface IGauzyFeatures {
	[key: string]: boolean;
}

/**
 * Server Environment
 */
export interface IEnvironment {
	port: number | string;
	host: string;
	baseUrl: string;

	production: boolean;
	envName: string;

	env?: Env;

	EXPRESS_SESSION_SECRET: string;
	USER_PASSWORD_BCRYPT_SALT_ROUNDS?: number;
	JWT_SECRET?: string;

	fileSystem: FileSystem;
	awsConfig?: AWSConfig;

	database: TypeOrmModuleOptions;

	facebookConfig: IFacebookConfig;
	googleConfig: IGoogleConfig;
	githubConfig: IGithubConfig;
	microsoftConfig: IMicrosoftConfig;
	linkedinConfig: ILinkedinConfig;
	twitterConfig: ITwitterConfig;
	fiverrConfig: IFiverrConfig;
	keycloakConfig: IKeycloakConfig;
	auth0Config: IAuth0Config;

	sentry?: {
		dns: string;
	};

	defaultHubstaffUserPass?: string;
	upworkConfig?: IUpworkConfig;
	isElectron?: boolean;
	gauzyUserPath?: string;
	allowSuperAdminRole?: boolean;

	/**
	 * Endpoint for Gauzy AI API (optional), e.g.: http://localhost:3005/graphql
	 */
	gauzyAIGraphQLEndpoint?: string;

	smtpConfig?: ISMTPConfig;
	defaultCurrency: string;

	unleashConfig?: IUnleashConfig;
}
