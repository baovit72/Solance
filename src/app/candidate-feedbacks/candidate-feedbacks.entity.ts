import {
	Column,
	Entity,
	OneToOne,
	JoinColumn,
	OneToMany,
	ManyToOne
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	ICandidateFeedback,
	CandidateStatus,
	ICandidateInterviewers,
	ICandidateCriterionsRating,
	ICandidate,
	ICandidateInterview
} from '@gauzy/models';
import { IsEnum, IsOptional } from 'class-validator';
import { CandidateInterviewers } from '../candidate-interviewers/candidate-interviewers.entity';
import { CandidateCriterionsRating } from '../candidate-criterions-rating/candidate-criterion-rating.entity';
import { Candidate } from '../candidate/candidate.entity';
import { CandidateInterview } from '../candidate-interview/candidate-interview.entity';
import { TenantOrganizationBase } from '../core/entities/tenant-organization-base';

@Entity('candidate_feedback')
export class CandidateFeedback
	extends TenantOrganizationBase
	implements ICandidateFeedback {
	@ApiProperty({ type: String })
	@Column()
	description: string;

	@ApiProperty({ type: String })
	@Column({ nullable: true })
	candidateId?: string;

	@ApiPropertyOptional({ type: Number })
	@Column({ nullable: true, type: 'numeric' })
	rating: number;

	@ApiProperty({ type: String })
	@Column({ nullable: true })
	interviewId?: string;

	@ApiProperty({ type: String, enum: CandidateStatus })
	@IsEnum(CandidateStatus)
	@IsOptional()
	@Column({ nullable: true })
	status?: string;

	@ApiProperty({ type: CandidateInterviewers })
	@OneToOne((type) => CandidateInterviewers)
	@JoinColumn()
	interviewer?: ICandidateInterviewers;

	@OneToMany(
		(type) => CandidateCriterionsRating,
		(criterionsRating) => criterionsRating.feedback,
		{
			cascade: true
		}
	)
	@JoinColumn()
	criterionsRating?: ICandidateCriterionsRating[];

	@ManyToOne(
		(type) => CandidateInterview,
		(candidateInterview) => candidateInterview.feedbacks,
		{
			onDelete: 'CASCADE'
		}
	)
	interview: ICandidateInterview;

	@ManyToOne((type) => Candidate, (candidate) => candidate.feedbacks, {
		onDelete: 'CASCADE'
	})
	candidate: ICandidate;
}
