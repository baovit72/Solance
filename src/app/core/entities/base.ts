// Code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta

import {
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	CreateDateColumn
} from 'typeorm';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { BaseEntityModel as IBaseEntityModel } from '@gauzy/models';

export abstract class Model {
	constructor(input?: any) {
		if (input) {
			Object.assign(this, input);
		}
	}
}
export abstract class Base extends Model implements IBaseEntityModel {
	@ApiPropertyOptional({ type: String })
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@ApiProperty({
		type: 'string',
		format: 'date-time',
		example: '2018-11-21T06:20:32.232Z'
	})
	@CreateDateColumn()
	createdAt?: Date;

	@ApiProperty({
		type: 'string',
		format: 'date-time',
		example: '2018-11-21T06:20:32.232Z'
	})
	@UpdateDateColumn()
	updatedAt?: Date;
}
