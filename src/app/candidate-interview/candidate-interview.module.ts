import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateInterviewService } from './candidate-interview.service';
import { CandidateInterviewController } from './candidate-interview.controller';
import { CandidateInterview } from './candidate-interview.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { TenantModule } from '../tenant/tenant.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([CandidateInterview, User]),
		TenantModule
	],
	providers: [CandidateInterviewService, UserService],
	controllers: [CandidateInterviewController],
	exports: [CandidateInterviewService]
})
export class CandidateInterviewModule {}
