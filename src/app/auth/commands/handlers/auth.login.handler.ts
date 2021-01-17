import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthLoginCommand } from '../auth.login.command';
import { AuthService } from '../../auth.service';
import { IAuthLoginInput, IAuthResponse } from '@gauzy/models';

@CommandHandler(AuthLoginCommand)
export class AuthLoginHandler implements ICommandHandler<AuthLoginCommand> {
	constructor(private readonly authService: AuthService) {}

	public async execute(command: AuthLoginCommand): Promise<IAuthResponse> {
		const { input } = command;
		const { findObj, password }: IAuthLoginInput = input;

		return this.authService.login(findObj, password);
	}
}
