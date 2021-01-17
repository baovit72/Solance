import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
	DateTime: any;
	/** Cursor for paging through collections */
	ConnectionCursor: any;
};

export type UpworkJobsSearchCriterion = {
	__typename?: 'UpworkJobsSearchCriterion';
	id?: Maybe<Scalars['ID']>;
	employeeId: Scalars['String'];
	category?: Maybe<Scalars['String']>;
	categoryId?: Maybe<Scalars['String']>;
	occupation?: Maybe<Scalars['String']>;
	occupationId?: Maybe<Scalars['String']>;
	jobType: Scalars['String'];
	keyword: Scalars['String'];
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	isActive: Scalars['Boolean'];
	isArchived: Scalars['Boolean'];
	employee: Employee;
};

export type Employee = {
	__typename?: 'Employee';
	id?: Maybe<Scalars['ID']>;
	externalEmployeeId?: Maybe<Scalars['String']>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	name?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	isActive: Scalars['Boolean'];
	isArchived: Scalars['Boolean'];
	upworkJobSearchCriteria: Array<UpworkJobsSearchCriterion>;
	upworkJobSearchCriteriaAggregate: EmployeeUpworkJobSearchCriteriaAggregateResponse;
};

export type EmployeeUpworkJobSearchCriteriaArgs = {
	paging?: Maybe<OffsetPaging>;
	filter?: Maybe<UpworkJobsSearchCriterionFilter>;
	sorting?: Maybe<Array<UpworkJobsSearchCriterionSort>>;
};

export type EmployeeUpworkJobSearchCriteriaAggregateArgs = {
	filter?: Maybe<UpworkJobsSearchCriterionAggregateFilter>;
};

export type OffsetPaging = {
	/** Limit the number of records returned */
	limit?: Maybe<Scalars['Int']>;
	/** Offset to start returning records from */
	offset?: Maybe<Scalars['Int']>;
};

export type UpworkJobsSearchCriterionFilter = {
	and?: Maybe<Array<UpworkJobsSearchCriterionFilter>>;
	or?: Maybe<Array<UpworkJobsSearchCriterionFilter>>;
	id?: Maybe<IdFilterComparison>;
	employeeId?: Maybe<StringFieldComparison>;
	jobType?: Maybe<StringFieldComparison>;
	isActive?: Maybe<BooleanFieldComparison>;
	isArchived?: Maybe<BooleanFieldComparison>;
};

export type IdFilterComparison = {
	is?: Maybe<Scalars['Boolean']>;
	isNot?: Maybe<Scalars['Boolean']>;
	eq?: Maybe<Scalars['ID']>;
	neq?: Maybe<Scalars['ID']>;
	gt?: Maybe<Scalars['ID']>;
	gte?: Maybe<Scalars['ID']>;
	lt?: Maybe<Scalars['ID']>;
	lte?: Maybe<Scalars['ID']>;
	like?: Maybe<Scalars['ID']>;
	notLike?: Maybe<Scalars['ID']>;
	iLike?: Maybe<Scalars['ID']>;
	notILike?: Maybe<Scalars['ID']>;
	in?: Maybe<Array<Scalars['ID']>>;
	notIn?: Maybe<Array<Scalars['ID']>>;
};

export type StringFieldComparison = {
	is?: Maybe<Scalars['Boolean']>;
	isNot?: Maybe<Scalars['Boolean']>;
	eq?: Maybe<Scalars['String']>;
	neq?: Maybe<Scalars['String']>;
	gt?: Maybe<Scalars['String']>;
	gte?: Maybe<Scalars['String']>;
	lt?: Maybe<Scalars['String']>;
	lte?: Maybe<Scalars['String']>;
	like?: Maybe<Scalars['String']>;
	notLike?: Maybe<Scalars['String']>;
	iLike?: Maybe<Scalars['String']>;
	notILike?: Maybe<Scalars['String']>;
	in?: Maybe<Array<Scalars['String']>>;
	notIn?: Maybe<Array<Scalars['String']>>;
};

export type BooleanFieldComparison = {
	is?: Maybe<Scalars['Boolean']>;
	isNot?: Maybe<Scalars['Boolean']>;
};

export type UpworkJobsSearchCriterionSort = {
	field: UpworkJobsSearchCriterionSortFields;
	direction: SortDirection;
	nulls?: Maybe<SortNulls>;
};

export enum UpworkJobsSearchCriterionSortFields {
	Id = 'id',
	EmployeeId = 'employeeId',
	JobType = 'jobType',
	IsActive = 'isActive',
	IsArchived = 'isArchived'
}

/** Sort Directions */
export enum SortDirection {
	Asc = 'ASC',
	Desc = 'DESC'
}

/** Sort Nulls Options */
export enum SortNulls {
	NullsFirst = 'NULLS_FIRST',
	NullsLast = 'NULLS_LAST'
}

export type UpworkJobsSearchCriterionAggregateFilter = {
	and?: Maybe<Array<UpworkJobsSearchCriterionAggregateFilter>>;
	or?: Maybe<Array<UpworkJobsSearchCriterionAggregateFilter>>;
	id?: Maybe<IdFilterComparison>;
	employeeId?: Maybe<StringFieldComparison>;
	jobType?: Maybe<StringFieldComparison>;
	isActive?: Maybe<BooleanFieldComparison>;
	isArchived?: Maybe<BooleanFieldComparison>;
};

export type JobPost = {
	__typename?: 'JobPost';
	id?: Maybe<Scalars['ID']>;
	providerCode: Scalars['String'];
	providerJobId: Scalars['String'];
	title: Scalars['String'];
	description: Scalars['String'];
	jobDateCreated?: Maybe<Scalars['DateTime']>;
	jobStatus?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
	url?: Maybe<Scalars['String']>;
	budget?: Maybe<Scalars['String']>;
	duration?: Maybe<Scalars['String']>;
	workload?: Maybe<Scalars['String']>;
	skills?: Maybe<Scalars['String']>;
	category?: Maybe<Scalars['String']>;
	subcategory?: Maybe<Scalars['String']>;
	country?: Maybe<Scalars['String']>;
	clientFeedback?: Maybe<Scalars['String']>;
	clientReviewsCount?: Maybe<Scalars['Float']>;
	clientJobsPosted?: Maybe<Scalars['Float']>;
	clientPastHires?: Maybe<Scalars['Float']>;
	clientPaymentVerificationStatus?: Maybe<Scalars['Boolean']>;
	searchCategory?: Maybe<Scalars['String']>;
	searchCategoryId?: Maybe<Scalars['String']>;
	searchOccupation?: Maybe<Scalars['String']>;
	searchOccupationId?: Maybe<Scalars['String']>;
	searchJobType?: Maybe<Scalars['String']>;
	searchKeyword?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	isActive: Scalars['Boolean'];
	isArchived: Scalars['Boolean'];
};

export type EmployeeJobPost = {
	__typename?: 'EmployeeJobPost';
	id?: Maybe<Scalars['ID']>;
	employeeId: Scalars['String'];
	jobPostId: Scalars['String'];
	jobDateCreated?: Maybe<Scalars['DateTime']>;
	jobStatus?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
	providerCode: Scalars['String'];
	providerJobId: Scalars['String'];
	isApplied?: Maybe<Scalars['Boolean']>;
	appliedDate?: Maybe<Scalars['DateTime']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	isActive: Scalars['Boolean'];
	isArchived: Scalars['Boolean'];
	jobPost: JobPost;
	employee: Employee;
};

export type DeleteManyResponse = {
	__typename?: 'DeleteManyResponse';
	/** The number of records deleted. */
	deletedCount: Scalars['Int'];
};

export type JobPostDeleteResponse = {
	__typename?: 'JobPostDeleteResponse';
	id?: Maybe<Scalars['ID']>;
	providerCode?: Maybe<Scalars['String']>;
	providerJobId?: Maybe<Scalars['String']>;
	title?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	jobDateCreated?: Maybe<Scalars['DateTime']>;
	jobStatus?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
	url?: Maybe<Scalars['String']>;
	budget?: Maybe<Scalars['String']>;
	duration?: Maybe<Scalars['String']>;
	workload?: Maybe<Scalars['String']>;
	skills?: Maybe<Scalars['String']>;
	category?: Maybe<Scalars['String']>;
	subcategory?: Maybe<Scalars['String']>;
	country?: Maybe<Scalars['String']>;
	clientFeedback?: Maybe<Scalars['String']>;
	clientReviewsCount?: Maybe<Scalars['Float']>;
	clientJobsPosted?: Maybe<Scalars['Float']>;
	clientPastHires?: Maybe<Scalars['Float']>;
	clientPaymentVerificationStatus?: Maybe<Scalars['Boolean']>;
	searchCategory?: Maybe<Scalars['String']>;
	searchCategoryId?: Maybe<Scalars['String']>;
	searchOccupation?: Maybe<Scalars['String']>;
	searchOccupationId?: Maybe<Scalars['String']>;
	searchJobType?: Maybe<Scalars['String']>;
	searchKeyword?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	isActive?: Maybe<Scalars['Boolean']>;
	isArchived?: Maybe<Scalars['Boolean']>;
};

export type UpdateManyResponse = {
	__typename?: 'UpdateManyResponse';
	/** The number of records updated. */
	updatedCount: Scalars['Int'];
};

export type JobPostEdge = {
	__typename?: 'JobPostEdge';
	/** The node containing the JobPost */
	node: JobPost;
	/** Cursor for this node. */
	cursor: Scalars['ConnectionCursor'];
};

export type PageInfo = {
	__typename?: 'PageInfo';
	/** true if paging forward and there are more records. */
	hasNextPage?: Maybe<Scalars['Boolean']>;
	/** true if paging backwards and there are more records. */
	hasPreviousPage?: Maybe<Scalars['Boolean']>;
	/** The cursor of the first returned record. */
	startCursor?: Maybe<Scalars['ConnectionCursor']>;
	/** The cursor of the last returned record. */
	endCursor?: Maybe<Scalars['ConnectionCursor']>;
};

export type JobPostConnection = {
	__typename?: 'JobPostConnection';
	/** Paging information */
	pageInfo: PageInfo;
	/** Array of edges. */
	edges: Array<JobPostEdge>;
	/** Fetch total count of records */
	totalCount: Scalars['Int'];
};

export type JobPostCountAggregate = {
	__typename?: 'JobPostCountAggregate';
	id?: Maybe<Scalars['Int']>;
	providerCode?: Maybe<Scalars['Int']>;
	providerJobId?: Maybe<Scalars['Int']>;
	jobDateCreated?: Maybe<Scalars['Int']>;
	jobStatus?: Maybe<Scalars['Int']>;
	jobType?: Maybe<Scalars['Int']>;
	country?: Maybe<Scalars['Int']>;
	createdAt?: Maybe<Scalars['Int']>;
	updatedAt?: Maybe<Scalars['Int']>;
	isActive?: Maybe<Scalars['Int']>;
	isArchived?: Maybe<Scalars['Int']>;
};

export type JobPostMinAggregate = {
	__typename?: 'JobPostMinAggregate';
	id?: Maybe<Scalars['ID']>;
	providerCode?: Maybe<Scalars['String']>;
	providerJobId?: Maybe<Scalars['String']>;
	jobDateCreated?: Maybe<Scalars['DateTime']>;
	jobStatus?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
	country?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
};

export type JobPostMaxAggregate = {
	__typename?: 'JobPostMaxAggregate';
	id?: Maybe<Scalars['ID']>;
	providerCode?: Maybe<Scalars['String']>;
	providerJobId?: Maybe<Scalars['String']>;
	jobDateCreated?: Maybe<Scalars['DateTime']>;
	jobStatus?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
	country?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
};

export type JobPostAggregateResponse = {
	__typename?: 'JobPostAggregateResponse';
	count?: Maybe<JobPostCountAggregate>;
	min?: Maybe<JobPostMinAggregate>;
	max?: Maybe<JobPostMaxAggregate>;
};

export type UpworkJobsSearchCriterionDeleteResponse = {
	__typename?: 'UpworkJobsSearchCriterionDeleteResponse';
	id?: Maybe<Scalars['ID']>;
	employeeId?: Maybe<Scalars['String']>;
	category?: Maybe<Scalars['String']>;
	categoryId?: Maybe<Scalars['String']>;
	occupation?: Maybe<Scalars['String']>;
	occupationId?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
	keyword?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	isActive?: Maybe<Scalars['Boolean']>;
	isArchived?: Maybe<Scalars['Boolean']>;
};

export type UpworkJobsSearchCriterionEdge = {
	__typename?: 'UpworkJobsSearchCriterionEdge';
	/** The node containing the UpworkJobsSearchCriterion */
	node: UpworkJobsSearchCriterion;
	/** Cursor for this node. */
	cursor: Scalars['ConnectionCursor'];
};

export type UpworkJobsSearchCriterionConnection = {
	__typename?: 'UpworkJobsSearchCriterionConnection';
	/** Paging information */
	pageInfo: PageInfo;
	/** Array of edges. */
	edges: Array<UpworkJobsSearchCriterionEdge>;
	/** Fetch total count of records */
	totalCount: Scalars['Int'];
};

export type UpworkJobsSearchCriterionCountAggregate = {
	__typename?: 'UpworkJobsSearchCriterionCountAggregate';
	id?: Maybe<Scalars['Int']>;
	employeeId?: Maybe<Scalars['Int']>;
	jobType?: Maybe<Scalars['Int']>;
	isActive?: Maybe<Scalars['Int']>;
	isArchived?: Maybe<Scalars['Int']>;
};

export type UpworkJobsSearchCriterionMinAggregate = {
	__typename?: 'UpworkJobsSearchCriterionMinAggregate';
	id?: Maybe<Scalars['ID']>;
	employeeId?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
};

export type UpworkJobsSearchCriterionMaxAggregate = {
	__typename?: 'UpworkJobsSearchCriterionMaxAggregate';
	id?: Maybe<Scalars['ID']>;
	employeeId?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
};

export type UpworkJobsSearchCriterionAggregateResponse = {
	__typename?: 'UpworkJobsSearchCriterionAggregateResponse';
	count?: Maybe<UpworkJobsSearchCriterionCountAggregate>;
	min?: Maybe<UpworkJobsSearchCriterionMinAggregate>;
	max?: Maybe<UpworkJobsSearchCriterionMaxAggregate>;
};

export type EmployeeDeleteResponse = {
	__typename?: 'EmployeeDeleteResponse';
	id?: Maybe<Scalars['ID']>;
	externalEmployeeId?: Maybe<Scalars['String']>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	name?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	isActive?: Maybe<Scalars['Boolean']>;
	isArchived?: Maybe<Scalars['Boolean']>;
};

export type EmployeeEdge = {
	__typename?: 'EmployeeEdge';
	/** The node containing the Employee */
	node: Employee;
	/** Cursor for this node. */
	cursor: Scalars['ConnectionCursor'];
};

export type EmployeeConnection = {
	__typename?: 'EmployeeConnection';
	/** Paging information */
	pageInfo: PageInfo;
	/** Array of edges. */
	edges: Array<EmployeeEdge>;
	/** Fetch total count of records */
	totalCount: Scalars['Int'];
};

export type EmployeeCountAggregate = {
	__typename?: 'EmployeeCountAggregate';
	id?: Maybe<Scalars['Int']>;
	externalEmployeeId?: Maybe<Scalars['Int']>;
	firstName?: Maybe<Scalars['Int']>;
	lastName?: Maybe<Scalars['Int']>;
	jobType?: Maybe<Scalars['Int']>;
	createdAt?: Maybe<Scalars['Int']>;
	updatedAt?: Maybe<Scalars['Int']>;
	isActive?: Maybe<Scalars['Int']>;
	isArchived?: Maybe<Scalars['Int']>;
};

export type EmployeeMinAggregate = {
	__typename?: 'EmployeeMinAggregate';
	id?: Maybe<Scalars['ID']>;
	externalEmployeeId?: Maybe<Scalars['String']>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
};

export type EmployeeMaxAggregate = {
	__typename?: 'EmployeeMaxAggregate';
	id?: Maybe<Scalars['ID']>;
	externalEmployeeId?: Maybe<Scalars['String']>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
};

export type EmployeeAggregateResponse = {
	__typename?: 'EmployeeAggregateResponse';
	count?: Maybe<EmployeeCountAggregate>;
	min?: Maybe<EmployeeMinAggregate>;
	max?: Maybe<EmployeeMaxAggregate>;
};

export type EmployeeUpworkJobSearchCriteriaCountAggregate = {
	__typename?: 'EmployeeUpworkJobSearchCriteriaCountAggregate';
	id?: Maybe<Scalars['Int']>;
	employeeId?: Maybe<Scalars['Int']>;
	jobType?: Maybe<Scalars['Int']>;
	isActive?: Maybe<Scalars['Int']>;
	isArchived?: Maybe<Scalars['Int']>;
};

export type EmployeeUpworkJobSearchCriteriaMinAggregate = {
	__typename?: 'EmployeeUpworkJobSearchCriteriaMinAggregate';
	id?: Maybe<Scalars['ID']>;
	employeeId?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
};

export type EmployeeUpworkJobSearchCriteriaMaxAggregate = {
	__typename?: 'EmployeeUpworkJobSearchCriteriaMaxAggregate';
	id?: Maybe<Scalars['ID']>;
	employeeId?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
};

export type EmployeeUpworkJobSearchCriteriaAggregateResponse = {
	__typename?: 'EmployeeUpworkJobSearchCriteriaAggregateResponse';
	count?: Maybe<EmployeeUpworkJobSearchCriteriaCountAggregate>;
	min?: Maybe<EmployeeUpworkJobSearchCriteriaMinAggregate>;
	max?: Maybe<EmployeeUpworkJobSearchCriteriaMaxAggregate>;
};

export type EmployeeJobPostDeleteResponse = {
	__typename?: 'EmployeeJobPostDeleteResponse';
	id?: Maybe<Scalars['ID']>;
	employeeId?: Maybe<Scalars['String']>;
	jobPostId?: Maybe<Scalars['String']>;
	jobDateCreated?: Maybe<Scalars['DateTime']>;
	jobStatus?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
	providerCode?: Maybe<Scalars['String']>;
	providerJobId?: Maybe<Scalars['String']>;
	isApplied?: Maybe<Scalars['Boolean']>;
	appliedDate?: Maybe<Scalars['DateTime']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	isActive?: Maybe<Scalars['Boolean']>;
	isArchived?: Maybe<Scalars['Boolean']>;
};

export type EmployeeJobPostEdge = {
	__typename?: 'EmployeeJobPostEdge';
	/** The node containing the EmployeeJobPost */
	node: EmployeeJobPost;
	/** Cursor for this node. */
	cursor: Scalars['ConnectionCursor'];
};

export type EmployeeJobPostConnection = {
	__typename?: 'EmployeeJobPostConnection';
	/** Paging information */
	pageInfo: PageInfo;
	/** Array of edges. */
	edges: Array<EmployeeJobPostEdge>;
	/** Fetch total count of records */
	totalCount: Scalars['Int'];
};

export type EmployeeJobPostCountAggregate = {
	__typename?: 'EmployeeJobPostCountAggregate';
	id?: Maybe<Scalars['Int']>;
	employeeId?: Maybe<Scalars['Int']>;
	jobPostId?: Maybe<Scalars['Int']>;
	jobDateCreated?: Maybe<Scalars['Int']>;
	jobStatus?: Maybe<Scalars['Int']>;
	jobType?: Maybe<Scalars['Int']>;
	providerCode?: Maybe<Scalars['Int']>;
	providerJobId?: Maybe<Scalars['Int']>;
	isApplied?: Maybe<Scalars['Int']>;
	appliedDate?: Maybe<Scalars['Int']>;
	createdAt?: Maybe<Scalars['Int']>;
	updatedAt?: Maybe<Scalars['Int']>;
	isActive?: Maybe<Scalars['Int']>;
	isArchived?: Maybe<Scalars['Int']>;
};

export type EmployeeJobPostMinAggregate = {
	__typename?: 'EmployeeJobPostMinAggregate';
	id?: Maybe<Scalars['ID']>;
	employeeId?: Maybe<Scalars['String']>;
	jobPostId?: Maybe<Scalars['String']>;
	jobDateCreated?: Maybe<Scalars['DateTime']>;
	jobStatus?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
	providerCode?: Maybe<Scalars['String']>;
	providerJobId?: Maybe<Scalars['String']>;
	appliedDate?: Maybe<Scalars['DateTime']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
};

export type EmployeeJobPostMaxAggregate = {
	__typename?: 'EmployeeJobPostMaxAggregate';
	id?: Maybe<Scalars['ID']>;
	employeeId?: Maybe<Scalars['String']>;
	jobPostId?: Maybe<Scalars['String']>;
	jobDateCreated?: Maybe<Scalars['DateTime']>;
	jobStatus?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
	providerCode?: Maybe<Scalars['String']>;
	providerJobId?: Maybe<Scalars['String']>;
	appliedDate?: Maybe<Scalars['DateTime']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
};

export type EmployeeJobPostAggregateResponse = {
	__typename?: 'EmployeeJobPostAggregateResponse';
	count?: Maybe<EmployeeJobPostCountAggregate>;
	min?: Maybe<EmployeeJobPostMinAggregate>;
	max?: Maybe<EmployeeJobPostMaxAggregate>;
};

export type Query = {
	__typename?: 'Query';
	jobPost?: Maybe<JobPost>;
	jobPosts: JobPostConnection;
	jobPostAggregate: JobPostAggregateResponse;
	upworkJobsSearchCriterion?: Maybe<UpworkJobsSearchCriterion>;
	upworkJobsSearchCriteria: UpworkJobsSearchCriterionConnection;
	upworkJobsSearchCriterionAggregate: UpworkJobsSearchCriterionAggregateResponse;
	employee?: Maybe<Employee>;
	employees: EmployeeConnection;
	employeeAggregate: EmployeeAggregateResponse;
	employeeJobPost?: Maybe<EmployeeJobPost>;
	employeeJobPosts: EmployeeJobPostConnection;
	employeeJobPostAggregate: EmployeeJobPostAggregateResponse;
};

export type QueryJobPostArgs = {
	id: Scalars['ID'];
};

export type QueryJobPostsArgs = {
	paging?: Maybe<CursorPaging>;
	filter?: Maybe<JobPostFilter>;
	sorting?: Maybe<Array<JobPostSort>>;
};

export type QueryJobPostAggregateArgs = {
	filter?: Maybe<JobPostAggregateFilter>;
};

export type QueryUpworkJobsSearchCriterionArgs = {
	id: Scalars['ID'];
};

export type QueryUpworkJobsSearchCriteriaArgs = {
	paging?: Maybe<CursorPaging>;
	filter?: Maybe<UpworkJobsSearchCriterionFilter>;
	sorting?: Maybe<Array<UpworkJobsSearchCriterionSort>>;
};

export type QueryUpworkJobsSearchCriterionAggregateArgs = {
	filter?: Maybe<UpworkJobsSearchCriterionAggregateFilter>;
};

export type QueryEmployeeArgs = {
	id: Scalars['ID'];
};

export type QueryEmployeesArgs = {
	paging?: Maybe<CursorPaging>;
	filter?: Maybe<EmployeeFilter>;
	sorting?: Maybe<Array<EmployeeSort>>;
};

export type QueryEmployeeAggregateArgs = {
	filter?: Maybe<EmployeeAggregateFilter>;
};

export type QueryEmployeeJobPostArgs = {
	id: Scalars['ID'];
};

export type QueryEmployeeJobPostsArgs = {
	paging?: Maybe<CursorPaging>;
	filter?: Maybe<EmployeeJobPostFilter>;
	sorting?: Maybe<Array<EmployeeJobPostSort>>;
};

export type QueryEmployeeJobPostAggregateArgs = {
	filter?: Maybe<EmployeeJobPostAggregateFilter>;
};

export type CursorPaging = {
	/** Paginate before opaque cursor */
	before?: Maybe<Scalars['ConnectionCursor']>;
	/** Paginate after opaque cursor */
	after?: Maybe<Scalars['ConnectionCursor']>;
	/** Paginate first */
	first?: Maybe<Scalars['Int']>;
	/** Paginate last */
	last?: Maybe<Scalars['Int']>;
};

export type JobPostFilter = {
	and?: Maybe<Array<JobPostFilter>>;
	or?: Maybe<Array<JobPostFilter>>;
	id?: Maybe<IdFilterComparison>;
	providerCode?: Maybe<StringFieldComparison>;
	providerJobId?: Maybe<StringFieldComparison>;
	jobDateCreated?: Maybe<DateFieldComparison>;
	jobStatus?: Maybe<StringFieldComparison>;
	jobType?: Maybe<StringFieldComparison>;
	country?: Maybe<StringFieldComparison>;
	createdAt?: Maybe<DateFieldComparison>;
	updatedAt?: Maybe<DateFieldComparison>;
	isActive?: Maybe<BooleanFieldComparison>;
	isArchived?: Maybe<BooleanFieldComparison>;
};

export type DateFieldComparison = {
	is?: Maybe<Scalars['Boolean']>;
	isNot?: Maybe<Scalars['Boolean']>;
	eq?: Maybe<Scalars['DateTime']>;
	neq?: Maybe<Scalars['DateTime']>;
	gt?: Maybe<Scalars['DateTime']>;
	gte?: Maybe<Scalars['DateTime']>;
	lt?: Maybe<Scalars['DateTime']>;
	lte?: Maybe<Scalars['DateTime']>;
	in?: Maybe<Array<Scalars['DateTime']>>;
	notIn?: Maybe<Array<Scalars['DateTime']>>;
	between?: Maybe<DateFieldComparisonBetween>;
	notBetween?: Maybe<DateFieldComparisonBetween>;
};

export type DateFieldComparisonBetween = {
	lower: Scalars['DateTime'];
	upper: Scalars['DateTime'];
};

export type JobPostSort = {
	field: JobPostSortFields;
	direction: SortDirection;
	nulls?: Maybe<SortNulls>;
};

export enum JobPostSortFields {
	Id = 'id',
	ProviderCode = 'providerCode',
	ProviderJobId = 'providerJobId',
	JobDateCreated = 'jobDateCreated',
	JobStatus = 'jobStatus',
	JobType = 'jobType',
	Country = 'country',
	CreatedAt = 'createdAt',
	UpdatedAt = 'updatedAt',
	IsActive = 'isActive',
	IsArchived = 'isArchived'
}

export type JobPostAggregateFilter = {
	and?: Maybe<Array<JobPostAggregateFilter>>;
	or?: Maybe<Array<JobPostAggregateFilter>>;
	id?: Maybe<IdFilterComparison>;
	providerCode?: Maybe<StringFieldComparison>;
	providerJobId?: Maybe<StringFieldComparison>;
	jobDateCreated?: Maybe<DateFieldComparison>;
	jobStatus?: Maybe<StringFieldComparison>;
	jobType?: Maybe<StringFieldComparison>;
	country?: Maybe<StringFieldComparison>;
	createdAt?: Maybe<DateFieldComparison>;
	updatedAt?: Maybe<DateFieldComparison>;
	isActive?: Maybe<BooleanFieldComparison>;
	isArchived?: Maybe<BooleanFieldComparison>;
};

export type EmployeeFilter = {
	and?: Maybe<Array<EmployeeFilter>>;
	or?: Maybe<Array<EmployeeFilter>>;
	id?: Maybe<IdFilterComparison>;
	externalEmployeeId?: Maybe<StringFieldComparison>;
	firstName?: Maybe<StringFieldComparison>;
	lastName?: Maybe<StringFieldComparison>;
	jobType?: Maybe<StringFieldComparison>;
	createdAt?: Maybe<DateFieldComparison>;
	updatedAt?: Maybe<DateFieldComparison>;
	isActive?: Maybe<BooleanFieldComparison>;
	isArchived?: Maybe<BooleanFieldComparison>;
};

export type EmployeeSort = {
	field: EmployeeSortFields;
	direction: SortDirection;
	nulls?: Maybe<SortNulls>;
};

export enum EmployeeSortFields {
	Id = 'id',
	ExternalEmployeeId = 'externalEmployeeId',
	FirstName = 'firstName',
	LastName = 'lastName',
	JobType = 'jobType',
	CreatedAt = 'createdAt',
	UpdatedAt = 'updatedAt',
	IsActive = 'isActive',
	IsArchived = 'isArchived'
}

export type EmployeeAggregateFilter = {
	and?: Maybe<Array<EmployeeAggregateFilter>>;
	or?: Maybe<Array<EmployeeAggregateFilter>>;
	id?: Maybe<IdFilterComparison>;
	externalEmployeeId?: Maybe<StringFieldComparison>;
	firstName?: Maybe<StringFieldComparison>;
	lastName?: Maybe<StringFieldComparison>;
	jobType?: Maybe<StringFieldComparison>;
	createdAt?: Maybe<DateFieldComparison>;
	updatedAt?: Maybe<DateFieldComparison>;
	isActive?: Maybe<BooleanFieldComparison>;
	isArchived?: Maybe<BooleanFieldComparison>;
};

export type EmployeeJobPostFilter = {
	and?: Maybe<Array<EmployeeJobPostFilter>>;
	or?: Maybe<Array<EmployeeJobPostFilter>>;
	id?: Maybe<IdFilterComparison>;
	employeeId?: Maybe<StringFieldComparison>;
	jobPostId?: Maybe<StringFieldComparison>;
	jobDateCreated?: Maybe<DateFieldComparison>;
	jobStatus?: Maybe<StringFieldComparison>;
	jobType?: Maybe<StringFieldComparison>;
	providerCode?: Maybe<StringFieldComparison>;
	providerJobId?: Maybe<StringFieldComparison>;
	isApplied?: Maybe<BooleanFieldComparison>;
	appliedDate?: Maybe<DateFieldComparison>;
	createdAt?: Maybe<DateFieldComparison>;
	updatedAt?: Maybe<DateFieldComparison>;
	isActive?: Maybe<BooleanFieldComparison>;
	isArchived?: Maybe<BooleanFieldComparison>;
	jobPost?: Maybe<EmployeeJobPostFilterJobPostFilter>;
	employee?: Maybe<EmployeeJobPostFilterEmployeeFilter>;
};

export type EmployeeJobPostFilterJobPostFilter = {
	and?: Maybe<Array<EmployeeJobPostFilterJobPostFilter>>;
	or?: Maybe<Array<EmployeeJobPostFilterJobPostFilter>>;
	id?: Maybe<IdFilterComparison>;
	providerCode?: Maybe<StringFieldComparison>;
	providerJobId?: Maybe<StringFieldComparison>;
	jobDateCreated?: Maybe<DateFieldComparison>;
	jobStatus?: Maybe<StringFieldComparison>;
	jobType?: Maybe<StringFieldComparison>;
	country?: Maybe<StringFieldComparison>;
	createdAt?: Maybe<DateFieldComparison>;
	updatedAt?: Maybe<DateFieldComparison>;
	isActive?: Maybe<BooleanFieldComparison>;
	isArchived?: Maybe<BooleanFieldComparison>;
};

export type EmployeeJobPostFilterEmployeeFilter = {
	and?: Maybe<Array<EmployeeJobPostFilterEmployeeFilter>>;
	or?: Maybe<Array<EmployeeJobPostFilterEmployeeFilter>>;
	id?: Maybe<IdFilterComparison>;
	externalEmployeeId?: Maybe<StringFieldComparison>;
	firstName?: Maybe<StringFieldComparison>;
	lastName?: Maybe<StringFieldComparison>;
	jobType?: Maybe<StringFieldComparison>;
	createdAt?: Maybe<DateFieldComparison>;
	updatedAt?: Maybe<DateFieldComparison>;
	isActive?: Maybe<BooleanFieldComparison>;
	isArchived?: Maybe<BooleanFieldComparison>;
};

export type EmployeeJobPostSort = {
	field: EmployeeJobPostSortFields;
	direction: SortDirection;
	nulls?: Maybe<SortNulls>;
};

export enum EmployeeJobPostSortFields {
	Id = 'id',
	EmployeeId = 'employeeId',
	JobPostId = 'jobPostId',
	JobDateCreated = 'jobDateCreated',
	JobStatus = 'jobStatus',
	JobType = 'jobType',
	ProviderCode = 'providerCode',
	ProviderJobId = 'providerJobId',
	IsApplied = 'isApplied',
	AppliedDate = 'appliedDate',
	CreatedAt = 'createdAt',
	UpdatedAt = 'updatedAt',
	IsActive = 'isActive',
	IsArchived = 'isArchived'
}

export type EmployeeJobPostAggregateFilter = {
	and?: Maybe<Array<EmployeeJobPostAggregateFilter>>;
	or?: Maybe<Array<EmployeeJobPostAggregateFilter>>;
	id?: Maybe<IdFilterComparison>;
	employeeId?: Maybe<StringFieldComparison>;
	jobPostId?: Maybe<StringFieldComparison>;
	jobDateCreated?: Maybe<DateFieldComparison>;
	jobStatus?: Maybe<StringFieldComparison>;
	jobType?: Maybe<StringFieldComparison>;
	providerCode?: Maybe<StringFieldComparison>;
	providerJobId?: Maybe<StringFieldComparison>;
	isApplied?: Maybe<BooleanFieldComparison>;
	appliedDate?: Maybe<DateFieldComparison>;
	createdAt?: Maybe<DateFieldComparison>;
	updatedAt?: Maybe<DateFieldComparison>;
	isActive?: Maybe<BooleanFieldComparison>;
	isArchived?: Maybe<BooleanFieldComparison>;
};

export type Mutation = {
	__typename?: 'Mutation';
	deleteOneJobPost: JobPostDeleteResponse;
	deleteManyJobPosts: DeleteManyResponse;
	updateOneJobPost: JobPost;
	updateManyJobPosts: UpdateManyResponse;
	createOneJobPost: JobPost;
	createManyJobPosts: Array<JobPost>;
	deleteOneUpworkJobsSearchCriterion: UpworkJobsSearchCriterionDeleteResponse;
	deleteManyUpworkJobsSearchCriteria: DeleteManyResponse;
	updateOneUpworkJobsSearchCriterion: UpworkJobsSearchCriterion;
	updateManyUpworkJobsSearchCriteria: UpdateManyResponse;
	createOneUpworkJobsSearchCriterion: UpworkJobsSearchCriterion;
	createManyUpworkJobsSearchCriteria: Array<UpworkJobsSearchCriterion>;
	removeEmployeeFromUpworkJobsSearchCriterion: UpworkJobsSearchCriterion;
	setEmployeeOnUpworkJobsSearchCriterion: UpworkJobsSearchCriterion;
	deleteOneEmployee: EmployeeDeleteResponse;
	deleteManyEmployees: DeleteManyResponse;
	updateOneEmployee: Employee;
	updateManyEmployees: UpdateManyResponse;
	createOneEmployee: Employee;
	createManyEmployees: Array<Employee>;
	removeUpworkJobSearchCriteriaFromEmployee: Employee;
	addUpworkJobSearchCriteriaToEmployee: Employee;
	deleteOneEmployeeJobPost: EmployeeJobPostDeleteResponse;
	deleteManyEmployeeJobPosts: DeleteManyResponse;
	updateOneEmployeeJobPost: EmployeeJobPost;
	updateManyEmployeeJobPosts: UpdateManyResponse;
	createOneEmployeeJobPost: EmployeeJobPost;
	createManyEmployeeJobPosts: Array<EmployeeJobPost>;
	removeJobPostFromEmployeeJobPost: EmployeeJobPost;
	removeEmployeeFromEmployeeJobPost: EmployeeJobPost;
	setJobPostOnEmployeeJobPost: EmployeeJobPost;
	setEmployeeOnEmployeeJobPost: EmployeeJobPost;
};

export type MutationDeleteOneJobPostArgs = {
	input: DeleteOneInput;
};

export type MutationDeleteManyJobPostsArgs = {
	input: DeleteManyJobPostsInput;
};

export type MutationUpdateOneJobPostArgs = {
	input: UpdateOneJobPostInput;
};

export type MutationUpdateManyJobPostsArgs = {
	input: UpdateManyJobPostsInput;
};

export type MutationCreateOneJobPostArgs = {
	input: CreateOneJobPostInput;
};

export type MutationCreateManyJobPostsArgs = {
	input: CreateManyJobPostsInput;
};

export type MutationDeleteOneUpworkJobsSearchCriterionArgs = {
	input: DeleteOneInput;
};

export type MutationDeleteManyUpworkJobsSearchCriteriaArgs = {
	input: DeleteManyUpworkJobsSearchCriteriaInput;
};

export type MutationUpdateOneUpworkJobsSearchCriterionArgs = {
	input: UpdateOneUpworkJobsSearchCriterionInput;
};

export type MutationUpdateManyUpworkJobsSearchCriteriaArgs = {
	input: UpdateManyUpworkJobsSearchCriteriaInput;
};

export type MutationCreateOneUpworkJobsSearchCriterionArgs = {
	input: CreateOneUpworkJobsSearchCriterionInput;
};

export type MutationCreateManyUpworkJobsSearchCriteriaArgs = {
	input: CreateManyUpworkJobsSearchCriteriaInput;
};

export type MutationRemoveEmployeeFromUpworkJobsSearchCriterionArgs = {
	input: RelationInput;
};

export type MutationSetEmployeeOnUpworkJobsSearchCriterionArgs = {
	input: RelationInput;
};

export type MutationDeleteOneEmployeeArgs = {
	input: DeleteOneInput;
};

export type MutationDeleteManyEmployeesArgs = {
	input: DeleteManyEmployeesInput;
};

export type MutationUpdateOneEmployeeArgs = {
	input: UpdateOneEmployeeInput;
};

export type MutationUpdateManyEmployeesArgs = {
	input: UpdateManyEmployeesInput;
};

export type MutationCreateOneEmployeeArgs = {
	input: CreateOneEmployeeInput;
};

export type MutationCreateManyEmployeesArgs = {
	input: CreateManyEmployeesInput;
};

export type MutationRemoveUpworkJobSearchCriteriaFromEmployeeArgs = {
	input: RelationsInput;
};

export type MutationAddUpworkJobSearchCriteriaToEmployeeArgs = {
	input: RelationsInput;
};

export type MutationDeleteOneEmployeeJobPostArgs = {
	input: DeleteOneInput;
};

export type MutationDeleteManyEmployeeJobPostsArgs = {
	input: DeleteManyEmployeeJobPostsInput;
};

export type MutationUpdateOneEmployeeJobPostArgs = {
	input: UpdateOneEmployeeJobPostInput;
};

export type MutationUpdateManyEmployeeJobPostsArgs = {
	input: UpdateManyEmployeeJobPostsInput;
};

export type MutationCreateOneEmployeeJobPostArgs = {
	input: CreateOneEmployeeJobPostInput;
};

export type MutationCreateManyEmployeeJobPostsArgs = {
	input: CreateManyEmployeeJobPostsInput;
};

export type MutationRemoveJobPostFromEmployeeJobPostArgs = {
	input: RelationInput;
};

export type MutationRemoveEmployeeFromEmployeeJobPostArgs = {
	input: RelationInput;
};

export type MutationSetJobPostOnEmployeeJobPostArgs = {
	input: RelationInput;
};

export type MutationSetEmployeeOnEmployeeJobPostArgs = {
	input: RelationInput;
};

export type DeleteOneInput = {
	/** The id of the record to delete. */
	id: Scalars['ID'];
};

export type DeleteManyJobPostsInput = {
	/** Filter to find records to delete */
	filter: JobPostDeleteFilter;
};

export type JobPostDeleteFilter = {
	and?: Maybe<Array<JobPostDeleteFilter>>;
	or?: Maybe<Array<JobPostDeleteFilter>>;
	id?: Maybe<IdFilterComparison>;
	providerCode?: Maybe<StringFieldComparison>;
	providerJobId?: Maybe<StringFieldComparison>;
	jobDateCreated?: Maybe<DateFieldComparison>;
	jobStatus?: Maybe<StringFieldComparison>;
	jobType?: Maybe<StringFieldComparison>;
	country?: Maybe<StringFieldComparison>;
	createdAt?: Maybe<DateFieldComparison>;
	updatedAt?: Maybe<DateFieldComparison>;
	isActive?: Maybe<BooleanFieldComparison>;
	isArchived?: Maybe<BooleanFieldComparison>;
};

export type UpdateOneJobPostInput = {
	/** The id of the record to update */
	id: Scalars['ID'];
	/** The update to apply. */
	update: UpdateJobPost;
};

export type UpdateJobPost = {
	id?: Maybe<Scalars['ID']>;
	providerCode?: Maybe<Scalars['String']>;
	providerJobId?: Maybe<Scalars['String']>;
	title?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	jobDateCreated?: Maybe<Scalars['DateTime']>;
	jobStatus?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
	url?: Maybe<Scalars['String']>;
	budget?: Maybe<Scalars['String']>;
	duration?: Maybe<Scalars['String']>;
	workload?: Maybe<Scalars['String']>;
	skills?: Maybe<Scalars['String']>;
	category?: Maybe<Scalars['String']>;
	subcategory?: Maybe<Scalars['String']>;
	country?: Maybe<Scalars['String']>;
	clientFeedback?: Maybe<Scalars['String']>;
	clientReviewsCount?: Maybe<Scalars['Float']>;
	clientJobsPosted?: Maybe<Scalars['Float']>;
	clientPastHires?: Maybe<Scalars['Float']>;
	clientPaymentVerificationStatus?: Maybe<Scalars['Boolean']>;
	searchCategory?: Maybe<Scalars['String']>;
	searchCategoryId?: Maybe<Scalars['String']>;
	searchOccupation?: Maybe<Scalars['String']>;
	searchOccupationId?: Maybe<Scalars['String']>;
	searchJobType?: Maybe<Scalars['String']>;
	searchKeyword?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	isActive?: Maybe<Scalars['Boolean']>;
	isArchived?: Maybe<Scalars['Boolean']>;
};

export type UpdateManyJobPostsInput = {
	/** Filter used to find fields to update */
	filter: JobPostUpdateFilter;
	/** The update to apply to all records found using the filter */
	update: UpdateJobPost;
};

export type JobPostUpdateFilter = {
	and?: Maybe<Array<JobPostUpdateFilter>>;
	or?: Maybe<Array<JobPostUpdateFilter>>;
	id?: Maybe<IdFilterComparison>;
	providerCode?: Maybe<StringFieldComparison>;
	providerJobId?: Maybe<StringFieldComparison>;
	jobDateCreated?: Maybe<DateFieldComparison>;
	jobStatus?: Maybe<StringFieldComparison>;
	jobType?: Maybe<StringFieldComparison>;
	country?: Maybe<StringFieldComparison>;
	createdAt?: Maybe<DateFieldComparison>;
	updatedAt?: Maybe<DateFieldComparison>;
	isActive?: Maybe<BooleanFieldComparison>;
	isArchived?: Maybe<BooleanFieldComparison>;
};

export type CreateOneJobPostInput = {
	/** The record to create */
	jobPost: CreateJobPost;
};

export type CreateJobPost = {
	id?: Maybe<Scalars['ID']>;
	providerCode?: Maybe<Scalars['String']>;
	providerJobId?: Maybe<Scalars['String']>;
	title?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	jobDateCreated?: Maybe<Scalars['DateTime']>;
	jobStatus?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
	url?: Maybe<Scalars['String']>;
	budget?: Maybe<Scalars['String']>;
	duration?: Maybe<Scalars['String']>;
	workload?: Maybe<Scalars['String']>;
	skills?: Maybe<Scalars['String']>;
	category?: Maybe<Scalars['String']>;
	subcategory?: Maybe<Scalars['String']>;
	country?: Maybe<Scalars['String']>;
	clientFeedback?: Maybe<Scalars['String']>;
	clientReviewsCount?: Maybe<Scalars['Float']>;
	clientJobsPosted?: Maybe<Scalars['Float']>;
	clientPastHires?: Maybe<Scalars['Float']>;
	clientPaymentVerificationStatus?: Maybe<Scalars['Boolean']>;
	searchCategory?: Maybe<Scalars['String']>;
	searchCategoryId?: Maybe<Scalars['String']>;
	searchOccupation?: Maybe<Scalars['String']>;
	searchOccupationId?: Maybe<Scalars['String']>;
	searchJobType?: Maybe<Scalars['String']>;
	searchKeyword?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	isActive?: Maybe<Scalars['Boolean']>;
	isArchived?: Maybe<Scalars['Boolean']>;
};

export type CreateManyJobPostsInput = {
	/** Array of records to create */
	jobPosts: Array<CreateJobPost>;
};

export type DeleteManyUpworkJobsSearchCriteriaInput = {
	/** Filter to find records to delete */
	filter: UpworkJobsSearchCriterionDeleteFilter;
};

export type UpworkJobsSearchCriterionDeleteFilter = {
	and?: Maybe<Array<UpworkJobsSearchCriterionDeleteFilter>>;
	or?: Maybe<Array<UpworkJobsSearchCriterionDeleteFilter>>;
	id?: Maybe<IdFilterComparison>;
	employeeId?: Maybe<StringFieldComparison>;
	jobType?: Maybe<StringFieldComparison>;
	isActive?: Maybe<BooleanFieldComparison>;
	isArchived?: Maybe<BooleanFieldComparison>;
};

export type UpdateOneUpworkJobsSearchCriterionInput = {
	/** The id of the record to update */
	id: Scalars['ID'];
	/** The update to apply. */
	update: UpdateUpworkJobsSearchCriterion;
};

export type UpdateUpworkJobsSearchCriterion = {
	id?: Maybe<Scalars['ID']>;
	employeeId?: Maybe<Scalars['String']>;
	category?: Maybe<Scalars['String']>;
	categoryId?: Maybe<Scalars['String']>;
	occupation?: Maybe<Scalars['String']>;
	occupationId?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
	keyword?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	isActive?: Maybe<Scalars['Boolean']>;
	isArchived?: Maybe<Scalars['Boolean']>;
};

export type UpdateManyUpworkJobsSearchCriteriaInput = {
	/** Filter used to find fields to update */
	filter: UpworkJobsSearchCriterionUpdateFilter;
	/** The update to apply to all records found using the filter */
	update: UpdateUpworkJobsSearchCriterion;
};

export type UpworkJobsSearchCriterionUpdateFilter = {
	and?: Maybe<Array<UpworkJobsSearchCriterionUpdateFilter>>;
	or?: Maybe<Array<UpworkJobsSearchCriterionUpdateFilter>>;
	id?: Maybe<IdFilterComparison>;
	employeeId?: Maybe<StringFieldComparison>;
	jobType?: Maybe<StringFieldComparison>;
	isActive?: Maybe<BooleanFieldComparison>;
	isArchived?: Maybe<BooleanFieldComparison>;
};

export type CreateOneUpworkJobsSearchCriterionInput = {
	/** The record to create */
	upworkJobsSearchCriterion: CreateUpworkJobsSearchCriterion;
};

export type CreateUpworkJobsSearchCriterion = {
	id?: Maybe<Scalars['ID']>;
	employeeId?: Maybe<Scalars['String']>;
	category?: Maybe<Scalars['String']>;
	categoryId?: Maybe<Scalars['String']>;
	occupation?: Maybe<Scalars['String']>;
	occupationId?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
	keyword?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	isActive?: Maybe<Scalars['Boolean']>;
	isArchived?: Maybe<Scalars['Boolean']>;
};

export type CreateManyUpworkJobsSearchCriteriaInput = {
	/** Array of records to create */
	upworkJobsSearchCriteria: Array<CreateUpworkJobsSearchCriterion>;
};

export type RelationInput = {
	/** The id of the record. */
	id: Scalars['ID'];
	/** The id of relation. */
	relationId: Scalars['ID'];
};

export type DeleteManyEmployeesInput = {
	/** Filter to find records to delete */
	filter: EmployeeDeleteFilter;
};

export type EmployeeDeleteFilter = {
	and?: Maybe<Array<EmployeeDeleteFilter>>;
	or?: Maybe<Array<EmployeeDeleteFilter>>;
	id?: Maybe<IdFilterComparison>;
	externalEmployeeId?: Maybe<StringFieldComparison>;
	firstName?: Maybe<StringFieldComparison>;
	lastName?: Maybe<StringFieldComparison>;
	jobType?: Maybe<StringFieldComparison>;
	createdAt?: Maybe<DateFieldComparison>;
	updatedAt?: Maybe<DateFieldComparison>;
	isActive?: Maybe<BooleanFieldComparison>;
	isArchived?: Maybe<BooleanFieldComparison>;
};

export type UpdateOneEmployeeInput = {
	/** The id of the record to update */
	id: Scalars['ID'];
	/** The update to apply. */
	update: UpdateEmployee;
};

export type UpdateEmployee = {
	id?: Maybe<Scalars['ID']>;
	externalEmployeeId?: Maybe<Scalars['String']>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	name?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	isActive?: Maybe<Scalars['Boolean']>;
	isArchived?: Maybe<Scalars['Boolean']>;
};

export type UpdateManyEmployeesInput = {
	/** Filter used to find fields to update */
	filter: EmployeeUpdateFilter;
	/** The update to apply to all records found using the filter */
	update: UpdateEmployee;
};

export type EmployeeUpdateFilter = {
	and?: Maybe<Array<EmployeeUpdateFilter>>;
	or?: Maybe<Array<EmployeeUpdateFilter>>;
	id?: Maybe<IdFilterComparison>;
	externalEmployeeId?: Maybe<StringFieldComparison>;
	firstName?: Maybe<StringFieldComparison>;
	lastName?: Maybe<StringFieldComparison>;
	jobType?: Maybe<StringFieldComparison>;
	createdAt?: Maybe<DateFieldComparison>;
	updatedAt?: Maybe<DateFieldComparison>;
	isActive?: Maybe<BooleanFieldComparison>;
	isArchived?: Maybe<BooleanFieldComparison>;
};

export type CreateOneEmployeeInput = {
	/** The record to create */
	employee: CreateEmployee;
};

export type CreateEmployee = {
	id?: Maybe<Scalars['ID']>;
	externalEmployeeId?: Maybe<Scalars['String']>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	name?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	isActive?: Maybe<Scalars['Boolean']>;
	isArchived?: Maybe<Scalars['Boolean']>;
};

export type CreateManyEmployeesInput = {
	/** Array of records to create */
	employees: Array<CreateEmployee>;
};

export type RelationsInput = {
	/** The id of the record. */
	id: Scalars['ID'];
	/** The ids of the relations. */
	relationIds: Array<Scalars['ID']>;
};

export type DeleteManyEmployeeJobPostsInput = {
	/** Filter to find records to delete */
	filter: EmployeeJobPostDeleteFilter;
};

export type EmployeeJobPostDeleteFilter = {
	and?: Maybe<Array<EmployeeJobPostDeleteFilter>>;
	or?: Maybe<Array<EmployeeJobPostDeleteFilter>>;
	id?: Maybe<IdFilterComparison>;
	employeeId?: Maybe<StringFieldComparison>;
	jobPostId?: Maybe<StringFieldComparison>;
	jobDateCreated?: Maybe<DateFieldComparison>;
	jobStatus?: Maybe<StringFieldComparison>;
	jobType?: Maybe<StringFieldComparison>;
	providerCode?: Maybe<StringFieldComparison>;
	providerJobId?: Maybe<StringFieldComparison>;
	isApplied?: Maybe<BooleanFieldComparison>;
	appliedDate?: Maybe<DateFieldComparison>;
	createdAt?: Maybe<DateFieldComparison>;
	updatedAt?: Maybe<DateFieldComparison>;
	isActive?: Maybe<BooleanFieldComparison>;
	isArchived?: Maybe<BooleanFieldComparison>;
};

export type UpdateOneEmployeeJobPostInput = {
	/** The id of the record to update */
	id: Scalars['ID'];
	/** The update to apply. */
	update: UpdateEmployeeJobPost;
};

export type UpdateEmployeeJobPost = {
	id?: Maybe<Scalars['ID']>;
	employeeId?: Maybe<Scalars['String']>;
	jobPostId?: Maybe<Scalars['String']>;
	jobDateCreated?: Maybe<Scalars['DateTime']>;
	jobStatus?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
	providerCode?: Maybe<Scalars['String']>;
	providerJobId?: Maybe<Scalars['String']>;
	isApplied?: Maybe<Scalars['Boolean']>;
	appliedDate?: Maybe<Scalars['DateTime']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	isActive?: Maybe<Scalars['Boolean']>;
	isArchived?: Maybe<Scalars['Boolean']>;
};

export type UpdateManyEmployeeJobPostsInput = {
	/** Filter used to find fields to update */
	filter: EmployeeJobPostUpdateFilter;
	/** The update to apply to all records found using the filter */
	update: UpdateEmployeeJobPost;
};

export type EmployeeJobPostUpdateFilter = {
	and?: Maybe<Array<EmployeeJobPostUpdateFilter>>;
	or?: Maybe<Array<EmployeeJobPostUpdateFilter>>;
	id?: Maybe<IdFilterComparison>;
	employeeId?: Maybe<StringFieldComparison>;
	jobPostId?: Maybe<StringFieldComparison>;
	jobDateCreated?: Maybe<DateFieldComparison>;
	jobStatus?: Maybe<StringFieldComparison>;
	jobType?: Maybe<StringFieldComparison>;
	providerCode?: Maybe<StringFieldComparison>;
	providerJobId?: Maybe<StringFieldComparison>;
	isApplied?: Maybe<BooleanFieldComparison>;
	appliedDate?: Maybe<DateFieldComparison>;
	createdAt?: Maybe<DateFieldComparison>;
	updatedAt?: Maybe<DateFieldComparison>;
	isActive?: Maybe<BooleanFieldComparison>;
	isArchived?: Maybe<BooleanFieldComparison>;
};

export type CreateOneEmployeeJobPostInput = {
	/** The record to create */
	employeeJobPost: CreateEmployeeJobPost;
};

export type CreateEmployeeJobPost = {
	id?: Maybe<Scalars['ID']>;
	employeeId?: Maybe<Scalars['String']>;
	jobPostId?: Maybe<Scalars['String']>;
	jobDateCreated?: Maybe<Scalars['DateTime']>;
	jobStatus?: Maybe<Scalars['String']>;
	jobType?: Maybe<Scalars['String']>;
	providerCode?: Maybe<Scalars['String']>;
	providerJobId?: Maybe<Scalars['String']>;
	isApplied?: Maybe<Scalars['Boolean']>;
	appliedDate?: Maybe<Scalars['DateTime']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	isActive?: Maybe<Scalars['Boolean']>;
	isArchived?: Maybe<Scalars['Boolean']>;
};

export type CreateManyEmployeeJobPostsInput = {
	/** Array of records to create */
	employeeJobPosts: Array<CreateEmployeeJobPost>;
};

export type Subscription = {
	__typename?: 'Subscription';
	deletedOneJobPost: JobPostDeleteResponse;
	deletedManyJobPosts: DeleteManyResponse;
	updatedOneJobPost: JobPost;
	updatedManyJobPosts: UpdateManyResponse;
	createdJobPost: JobPost;
	deletedOneUpworkJobsSearchCriterion: UpworkJobsSearchCriterionDeleteResponse;
	deletedManyUpworkJobsSearchCriteria: DeleteManyResponse;
	updatedOneUpworkJobsSearchCriterion: UpworkJobsSearchCriterion;
	updatedManyUpworkJobsSearchCriteria: UpdateManyResponse;
	createdUpworkJobsSearchCriterion: UpworkJobsSearchCriterion;
	deletedOneEmployee: EmployeeDeleteResponse;
	deletedManyEmployees: DeleteManyResponse;
	updatedOneEmployee: Employee;
	updatedManyEmployees: UpdateManyResponse;
	createdEmployee: Employee;
	deletedOneEmployeeJobPost: EmployeeJobPostDeleteResponse;
	deletedManyEmployeeJobPosts: DeleteManyResponse;
	updatedOneEmployeeJobPost: EmployeeJobPost;
	updatedManyEmployeeJobPosts: UpdateManyResponse;
	createdEmployeeJobPost: EmployeeJobPost;
};

export type SubscriptionDeletedOneJobPostArgs = {
	input?: Maybe<DeleteOneJobPostSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneJobPostArgs = {
	input?: Maybe<UpdateOneJobPostSubscriptionFilterInput>;
};

export type SubscriptionCreatedJobPostArgs = {
	input?: Maybe<CreateJobPostSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneUpworkJobsSearchCriterionArgs = {
	input?: Maybe<DeleteOneUpworkJobsSearchCriterionSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneUpworkJobsSearchCriterionArgs = {
	input?: Maybe<UpdateOneUpworkJobsSearchCriterionSubscriptionFilterInput>;
};

export type SubscriptionCreatedUpworkJobsSearchCriterionArgs = {
	input?: Maybe<CreateUpworkJobsSearchCriterionSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneEmployeeArgs = {
	input?: Maybe<DeleteOneEmployeeSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneEmployeeArgs = {
	input?: Maybe<UpdateOneEmployeeSubscriptionFilterInput>;
};

export type SubscriptionCreatedEmployeeArgs = {
	input?: Maybe<CreateEmployeeSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneEmployeeJobPostArgs = {
	input?: Maybe<DeleteOneEmployeeJobPostSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneEmployeeJobPostArgs = {
	input?: Maybe<UpdateOneEmployeeJobPostSubscriptionFilterInput>;
};

export type SubscriptionCreatedEmployeeJobPostArgs = {
	input?: Maybe<CreateEmployeeJobPostSubscriptionFilterInput>;
};

export type DeleteOneJobPostSubscriptionFilterInput = {
	/** Specify to filter the records returned. */
	filter: JobPostSubscriptionFilter;
};

export type JobPostSubscriptionFilter = {
	and?: Maybe<Array<JobPostSubscriptionFilter>>;
	or?: Maybe<Array<JobPostSubscriptionFilter>>;
	id?: Maybe<IdFilterComparison>;
	providerCode?: Maybe<StringFieldComparison>;
	providerJobId?: Maybe<StringFieldComparison>;
	jobDateCreated?: Maybe<DateFieldComparison>;
	jobStatus?: Maybe<StringFieldComparison>;
	jobType?: Maybe<StringFieldComparison>;
	country?: Maybe<StringFieldComparison>;
	createdAt?: Maybe<DateFieldComparison>;
	updatedAt?: Maybe<DateFieldComparison>;
	isActive?: Maybe<BooleanFieldComparison>;
	isArchived?: Maybe<BooleanFieldComparison>;
};

export type UpdateOneJobPostSubscriptionFilterInput = {
	/** Specify to filter the records returned. */
	filter: JobPostSubscriptionFilter;
};

export type CreateJobPostSubscriptionFilterInput = {
	/** Specify to filter the records returned. */
	filter: JobPostSubscriptionFilter;
};

export type DeleteOneUpworkJobsSearchCriterionSubscriptionFilterInput = {
	/** Specify to filter the records returned. */
	filter: UpworkJobsSearchCriterionSubscriptionFilter;
};

export type UpworkJobsSearchCriterionSubscriptionFilter = {
	and?: Maybe<Array<UpworkJobsSearchCriterionSubscriptionFilter>>;
	or?: Maybe<Array<UpworkJobsSearchCriterionSubscriptionFilter>>;
	id?: Maybe<IdFilterComparison>;
	employeeId?: Maybe<StringFieldComparison>;
	jobType?: Maybe<StringFieldComparison>;
	isActive?: Maybe<BooleanFieldComparison>;
	isArchived?: Maybe<BooleanFieldComparison>;
};

export type UpdateOneUpworkJobsSearchCriterionSubscriptionFilterInput = {
	/** Specify to filter the records returned. */
	filter: UpworkJobsSearchCriterionSubscriptionFilter;
};

export type CreateUpworkJobsSearchCriterionSubscriptionFilterInput = {
	/** Specify to filter the records returned. */
	filter: UpworkJobsSearchCriterionSubscriptionFilter;
};

export type DeleteOneEmployeeSubscriptionFilterInput = {
	/** Specify to filter the records returned. */
	filter: EmployeeSubscriptionFilter;
};

export type EmployeeSubscriptionFilter = {
	and?: Maybe<Array<EmployeeSubscriptionFilter>>;
	or?: Maybe<Array<EmployeeSubscriptionFilter>>;
	id?: Maybe<IdFilterComparison>;
	externalEmployeeId?: Maybe<StringFieldComparison>;
	firstName?: Maybe<StringFieldComparison>;
	lastName?: Maybe<StringFieldComparison>;
	jobType?: Maybe<StringFieldComparison>;
	createdAt?: Maybe<DateFieldComparison>;
	updatedAt?: Maybe<DateFieldComparison>;
	isActive?: Maybe<BooleanFieldComparison>;
	isArchived?: Maybe<BooleanFieldComparison>;
};

export type UpdateOneEmployeeSubscriptionFilterInput = {
	/** Specify to filter the records returned. */
	filter: EmployeeSubscriptionFilter;
};

export type CreateEmployeeSubscriptionFilterInput = {
	/** Specify to filter the records returned. */
	filter: EmployeeSubscriptionFilter;
};

export type DeleteOneEmployeeJobPostSubscriptionFilterInput = {
	/** Specify to filter the records returned. */
	filter: EmployeeJobPostSubscriptionFilter;
};

export type EmployeeJobPostSubscriptionFilter = {
	and?: Maybe<Array<EmployeeJobPostSubscriptionFilter>>;
	or?: Maybe<Array<EmployeeJobPostSubscriptionFilter>>;
	id?: Maybe<IdFilterComparison>;
	employeeId?: Maybe<StringFieldComparison>;
	jobPostId?: Maybe<StringFieldComparison>;
	jobDateCreated?: Maybe<DateFieldComparison>;
	jobStatus?: Maybe<StringFieldComparison>;
	jobType?: Maybe<StringFieldComparison>;
	providerCode?: Maybe<StringFieldComparison>;
	providerJobId?: Maybe<StringFieldComparison>;
	isApplied?: Maybe<BooleanFieldComparison>;
	appliedDate?: Maybe<DateFieldComparison>;
	createdAt?: Maybe<DateFieldComparison>;
	updatedAt?: Maybe<DateFieldComparison>;
	isActive?: Maybe<BooleanFieldComparison>;
	isArchived?: Maybe<BooleanFieldComparison>;
};

export type UpdateOneEmployeeJobPostSubscriptionFilterInput = {
	/** Specify to filter the records returned. */
	filter: EmployeeJobPostSubscriptionFilter;
};

export type CreateEmployeeJobPostSubscriptionFilterInput = {
	/** Specify to filter the records returned. */
	filter: EmployeeJobPostSubscriptionFilter;
};

export type EmployeeJobPostsQueryVariables = Exact<{
	after: Scalars['ConnectionCursor'];
	first: Scalars['Int'];
	filter: EmployeeJobPostFilter;
	sorting?: Maybe<Array<EmployeeJobPostSort>>;
}>;

export type EmployeeJobPostsQuery = { __typename?: 'Query' } & {
	employeeJobPosts: { __typename?: 'EmployeeJobPostConnection' } & Pick<
		EmployeeJobPostConnection,
		'totalCount'
	> & {
			pageInfo: { __typename?: 'PageInfo' } & Pick<
				PageInfo,
				'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
			>;
			edges: Array<
				{ __typename?: 'EmployeeJobPostEdge' } & {
					node: { __typename?: 'EmployeeJobPost' } & Pick<
						EmployeeJobPost,
						| 'id'
						| 'isApplied'
						| 'appliedDate'
						| 'createdAt'
						| 'updatedAt'
						| 'isActive'
						| 'isArchived'
						| 'providerCode'
						| 'providerJobId'
						| 'jobDateCreated'
						| 'jobStatus'
						| 'jobType'
					> & {
							employee: { __typename?: 'Employee' } & Pick<
								Employee,
								'id' | 'externalEmployeeId'
							>;
							jobPost: { __typename?: 'JobPost' } & Pick<
								JobPost,
								| 'id'
								| 'providerCode'
								| 'providerJobId'
								| 'title'
								| 'description'
								| 'jobDateCreated'
								| 'jobStatus'
								| 'jobType'
								| 'url'
								| 'budget'
								| 'duration'
								| 'workload'
								| 'skills'
								| 'category'
								| 'subcategory'
								| 'country'
								| 'clientFeedback'
								| 'clientReviewsCount'
								| 'clientJobsPosted'
								| 'clientPastHires'
								| 'clientPaymentVerificationStatus'
							>;
						};
				}
			>;
		};
};

export type EmployeeJobPostsByEmployeeIdJobPostIdQueryVariables = Exact<{
	employeeIdFilter: Scalars['String'];
	jobPostIdFilter: Scalars['String'];
}>;

export type EmployeeJobPostsByEmployeeIdJobPostIdQuery = {
	__typename?: 'Query';
} & {
	employeeJobPosts: { __typename?: 'EmployeeJobPostConnection' } & {
		edges: Array<
			{ __typename?: 'EmployeeJobPostEdge' } & {
				node: { __typename?: 'EmployeeJobPost' } & Pick<
					EmployeeJobPost,
					'id' | 'isActive' | 'isArchived'
				>;
			}
		>;
	};
};

export type EmployeeQueryVariables = Exact<{ [key: string]: never }>;

export type EmployeeQuery = { __typename?: 'Query' } & {
	employees: { __typename?: 'EmployeeConnection' } & {
		pageInfo: { __typename?: 'PageInfo' } & Pick<
			PageInfo,
			'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
		>;
		edges: Array<
			{ __typename?: 'EmployeeEdge' } & {
				node: { __typename?: 'Employee' } & Pick<
					Employee,
					'id' | 'externalEmployeeId' | 'firstName' | 'lastName'
				>;
			}
		>;
	};
};

export type EmployeeByExternalEmployeeIdQueryVariables = Exact<{
	externalEmployeeIdFilter: Scalars['String'];
}>;

export type EmployeeByExternalEmployeeIdQuery = { __typename?: 'Query' } & {
	employees: { __typename?: 'EmployeeConnection' } & Pick<
		EmployeeConnection,
		'totalCount'
	> & {
			edges: Array<
				{ __typename?: 'EmployeeEdge' } & {
					node: { __typename?: 'Employee' } & Pick<
						Employee,
						'id' | 'externalEmployeeId'
					>;
				}
			>;
		};
};

export type EmployeeByNameQueryVariables = Exact<{
	firstNameFilter: Scalars['String'];
	lastNameFilter: Scalars['String'];
}>;

export type EmployeeByNameQuery = { __typename?: 'Query' } & {
	employees: { __typename?: 'EmployeeConnection' } & Pick<
		EmployeeConnection,
		'totalCount'
	> & {
			edges: Array<
				{ __typename?: 'EmployeeEdge' } & {
					node: { __typename?: 'Employee' } & Pick<
						Employee,
						'id' | 'firstName' | 'lastName' | 'externalEmployeeId'
					>;
				}
			>;
		};
};

export type UpdateOneEmployeeMutationVariables = Exact<{
	input: UpdateOneEmployeeInput;
}>;

export type UpdateOneEmployeeMutation = { __typename?: 'Mutation' } & {
	updateOneEmployee: { __typename?: 'Employee' } & Pick<
		Employee,
		| 'externalEmployeeId'
		| 'isActive'
		| 'isArchived'
		| 'firstName'
		| 'lastName'
	>;
};

export type UpdateOneEmployeeJobPostMutationVariables = Exact<{
	input: UpdateOneEmployeeJobPostInput;
}>;

export type UpdateOneEmployeeJobPostMutation = { __typename?: 'Mutation' } & {
	updateOneEmployeeJobPost: { __typename?: 'EmployeeJobPost' } & Pick<
		EmployeeJobPost,
		| 'employeeId'
		| 'jobPostId'
		| 'isActive'
		| 'isArchived'
		| 'isApplied'
		| 'appliedDate'
	>;
};

export type DeleteManyUpworkJobsSearchCriteriaMutationVariables = Exact<{
	input: DeleteManyUpworkJobsSearchCriteriaInput;
}>;

export type DeleteManyUpworkJobsSearchCriteriaMutation = {
	__typename?: 'Mutation';
} & {
	deleteManyUpworkJobsSearchCriteria: {
		__typename?: 'DeleteManyResponse';
	} & Pick<DeleteManyResponse, 'deletedCount'>;
};

export type CreateManyUpworkJobsSearchCriteriaMutationVariables = Exact<{
	input: CreateManyUpworkJobsSearchCriteriaInput;
}>;

export type CreateManyUpworkJobsSearchCriteriaMutation = {
	__typename?: 'Mutation';
} & {
	createManyUpworkJobsSearchCriteria: Array<
		{ __typename?: 'UpworkJobsSearchCriterion' } & Pick<
			UpworkJobsSearchCriterion,
			'id'
		>
	>;
};

export type JobPostsQueryVariables = Exact<{
	providerCodeFilter: Scalars['String'];
	providerJobIdFilter: Scalars['String'];
}>;

export type JobPostsQuery = { __typename?: 'Query' } & {
	jobPosts: { __typename?: 'JobPostConnection' } & {
		edges: Array<
			{ __typename?: 'JobPostEdge' } & {
				node: { __typename?: 'JobPost' } & Pick<
					JobPost,
					'id' | 'isActive' | 'isArchived'
				>;
			}
		>;
	};
};

export const EmployeeJobPostsDocument: DocumentNode<
	EmployeeJobPostsQuery,
	EmployeeJobPostsQueryVariables
> = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'employeeJobPosts' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'after' }
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'ConnectionCursor' }
						}
					},
					directives: []
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'first' }
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'Int' }
						}
					},
					directives: []
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'filter' }
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: {
								kind: 'Name',
								value: 'EmployeeJobPostFilter'
							}
						}
					},
					directives: []
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'sorting' }
					},
					type: {
						kind: 'ListType',
						type: {
							kind: 'NonNullType',
							type: {
								kind: 'NamedType',
								name: {
									kind: 'Name',
									value: 'EmployeeJobPostSort'
								}
							}
						}
					},
					directives: []
				}
			],
			directives: [],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'employeeJobPosts' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'paging' },
								value: {
									kind: 'ObjectValue',
									fields: [
										{
											kind: 'ObjectField',
											name: {
												kind: 'Name',
												value: 'after'
											},
											value: {
												kind: 'Variable',
												name: {
													kind: 'Name',
													value: 'after'
												}
											}
										},
										{
											kind: 'ObjectField',
											name: {
												kind: 'Name',
												value: 'first'
											},
											value: {
												kind: 'Variable',
												name: {
													kind: 'Name',
													value: 'first'
												}
											}
										}
									]
								}
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'filter' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'filter' }
								}
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'sorting' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'sorting' }
								}
							}
						],
						directives: [],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'totalCount' },
									arguments: [],
									directives: []
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'pageInfo' },
									arguments: [],
									directives: [],
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: {
													kind: 'Name',
													value: 'hasNextPage'
												},
												arguments: [],
												directives: []
											},
											{
												kind: 'Field',
												name: {
													kind: 'Name',
													value: 'hasPreviousPage'
												},
												arguments: [],
												directives: []
											},
											{
												kind: 'Field',
												name: {
													kind: 'Name',
													value: 'startCursor'
												},
												arguments: [],
												directives: []
											},
											{
												kind: 'Field',
												name: {
													kind: 'Name',
													value: 'endCursor'
												},
												arguments: [],
												directives: []
											}
										]
									}
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'edges' },
									arguments: [],
									directives: [],
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: {
													kind: 'Name',
													value: 'node'
												},
												arguments: [],
												directives: [],
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value: 'id'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value:
																	'isApplied'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value:
																	'appliedDate'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value:
																	'createdAt'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value:
																	'updatedAt'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value:
																	'isActive'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value:
																	'isArchived'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value:
																	'employee'
															},
															arguments: [],
															directives: [],
															selectionSet: {
																kind:
																	'SelectionSet',
																selections: [
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'id'
																		},
																		arguments: [],
																		directives: []
																	},
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'externalEmployeeId'
																		},
																		arguments: [],
																		directives: []
																	}
																]
															}
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value:
																	'providerCode'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value:
																	'providerJobId'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value:
																	'jobDateCreated'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value:
																	'jobStatus'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value: 'jobType'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value: 'jobPost'
															},
															arguments: [],
															directives: [],
															selectionSet: {
																kind:
																	'SelectionSet',
																selections: [
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'id'
																		},
																		arguments: [],
																		directives: []
																	},
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'providerCode'
																		},
																		arguments: [],
																		directives: []
																	},
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'providerJobId'
																		},
																		arguments: [],
																		directives: []
																	},
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'title'
																		},
																		arguments: [],
																		directives: []
																	},
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'description'
																		},
																		arguments: [],
																		directives: []
																	},
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'jobDateCreated'
																		},
																		arguments: [],
																		directives: []
																	},
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'jobStatus'
																		},
																		arguments: [],
																		directives: []
																	},
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'jobType'
																		},
																		arguments: [],
																		directives: []
																	},
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'url'
																		},
																		arguments: [],
																		directives: []
																	},
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'budget'
																		},
																		arguments: [],
																		directives: []
																	},
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'duration'
																		},
																		arguments: [],
																		directives: []
																	},
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'workload'
																		},
																		arguments: [],
																		directives: []
																	},
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'skills'
																		},
																		arguments: [],
																		directives: []
																	},
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'category'
																		},
																		arguments: [],
																		directives: []
																	},
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'subcategory'
																		},
																		arguments: [],
																		directives: []
																	},
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'country'
																		},
																		arguments: [],
																		directives: []
																	},
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'clientFeedback'
																		},
																		arguments: [],
																		directives: []
																	},
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'clientReviewsCount'
																		},
																		arguments: [],
																		directives: []
																	},
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'clientJobsPosted'
																		},
																		arguments: [],
																		directives: []
																	},
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'clientPastHires'
																		},
																		arguments: [],
																		directives: []
																	},
																	{
																		kind:
																			'Field',
																		name: {
																			kind:
																				'Name',
																			value:
																				'clientPaymentVerificationStatus'
																		},
																		arguments: [],
																		directives: []
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
};
export const EmployeeJobPostsByEmployeeIdJobPostIdDocument: DocumentNode<
	EmployeeJobPostsByEmployeeIdJobPostIdQuery,
	EmployeeJobPostsByEmployeeIdJobPostIdQueryVariables
> = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: {
				kind: 'Name',
				value: 'employeeJobPostsByEmployeeIdJobPostId'
			},
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'employeeIdFilter' }
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'String' }
						}
					},
					directives: []
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'jobPostIdFilter' }
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'String' }
						}
					},
					directives: []
				}
			],
			directives: [],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'employeeJobPosts' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'filter' },
								value: {
									kind: 'ObjectValue',
									fields: [
										{
											kind: 'ObjectField',
											name: {
												kind: 'Name',
												value: 'employeeId'
											},
											value: {
												kind: 'ObjectValue',
												fields: [
													{
														kind: 'ObjectField',
														name: {
															kind: 'Name',
															value: 'eq'
														},
														value: {
															kind: 'Variable',
															name: {
																kind: 'Name',
																value:
																	'employeeIdFilter'
															}
														}
													}
												]
											}
										},
										{
											kind: 'ObjectField',
											name: {
												kind: 'Name',
												value: 'jobPostId'
											},
											value: {
												kind: 'ObjectValue',
												fields: [
													{
														kind: 'ObjectField',
														name: {
															kind: 'Name',
															value: 'eq'
														},
														value: {
															kind: 'Variable',
															name: {
																kind: 'Name',
																value:
																	'jobPostIdFilter'
															}
														}
													}
												]
											}
										}
									]
								}
							}
						],
						directives: [],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'edges' },
									arguments: [],
									directives: [],
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: {
													kind: 'Name',
													value: 'node'
												},
												arguments: [],
												directives: [],
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value: 'id'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value:
																	'isActive'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value:
																	'isArchived'
															},
															arguments: [],
															directives: []
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
};
export const EmployeeDocument: DocumentNode<
	EmployeeQuery,
	EmployeeQueryVariables
> = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'employee' },
			variableDefinitions: [],
			directives: [],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'employees' },
						arguments: [],
						directives: [],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'pageInfo' },
									arguments: [],
									directives: [],
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: {
													kind: 'Name',
													value: 'hasNextPage'
												},
												arguments: [],
												directives: []
											},
											{
												kind: 'Field',
												name: {
													kind: 'Name',
													value: 'hasPreviousPage'
												},
												arguments: [],
												directives: []
											},
											{
												kind: 'Field',
												name: {
													kind: 'Name',
													value: 'startCursor'
												},
												arguments: [],
												directives: []
											},
											{
												kind: 'Field',
												name: {
													kind: 'Name',
													value: 'endCursor'
												},
												arguments: [],
												directives: []
											}
										]
									}
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'edges' },
									arguments: [],
									directives: [],
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: {
													kind: 'Name',
													value: 'node'
												},
												arguments: [],
												directives: [],
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value: 'id'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value:
																	'externalEmployeeId'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value:
																	'firstName'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value:
																	'lastName'
															},
															arguments: [],
															directives: []
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
};
export const EmployeeByExternalEmployeeIdDocument: DocumentNode<
	EmployeeByExternalEmployeeIdQuery,
	EmployeeByExternalEmployeeIdQueryVariables
> = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'employeeByExternalEmployeeId' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: {
							kind: 'Name',
							value: 'externalEmployeeIdFilter'
						}
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'String' }
						}
					},
					directives: []
				}
			],
			directives: [],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'employees' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'filter' },
								value: {
									kind: 'ObjectValue',
									fields: [
										{
											kind: 'ObjectField',
											name: {
												kind: 'Name',
												value: 'externalEmployeeId'
											},
											value: {
												kind: 'ObjectValue',
												fields: [
													{
														kind: 'ObjectField',
														name: {
															kind: 'Name',
															value: 'eq'
														},
														value: {
															kind: 'Variable',
															name: {
																kind: 'Name',
																value:
																	'externalEmployeeIdFilter'
															}
														}
													}
												]
											}
										}
									]
								}
							}
						],
						directives: [],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'edges' },
									arguments: [],
									directives: [],
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: {
													kind: 'Name',
													value: 'node'
												},
												arguments: [],
												directives: [],
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value: 'id'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value:
																	'externalEmployeeId'
															},
															arguments: [],
															directives: []
														}
													]
												}
											}
										]
									}
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'totalCount' },
									arguments: [],
									directives: []
								}
							]
						}
					}
				]
			}
		}
	]
};
export const EmployeeByNameDocument: DocumentNode<
	EmployeeByNameQuery,
	EmployeeByNameQueryVariables
> = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'employeeByName' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'firstNameFilter' }
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'String' }
						}
					},
					directives: []
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'lastNameFilter' }
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'String' }
						}
					},
					directives: []
				}
			],
			directives: [],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'employees' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'filter' },
								value: {
									kind: 'ObjectValue',
									fields: [
										{
											kind: 'ObjectField',
											name: {
												kind: 'Name',
												value: 'firstName'
											},
											value: {
												kind: 'ObjectValue',
												fields: [
													{
														kind: 'ObjectField',
														name: {
															kind: 'Name',
															value: 'eq'
														},
														value: {
															kind: 'Variable',
															name: {
																kind: 'Name',
																value:
																	'firstNameFilter'
															}
														}
													}
												]
											}
										},
										{
											kind: 'ObjectField',
											name: {
												kind: 'Name',
												value: 'lastName'
											},
											value: {
												kind: 'ObjectValue',
												fields: [
													{
														kind: 'ObjectField',
														name: {
															kind: 'Name',
															value: 'eq'
														},
														value: {
															kind: 'Variable',
															name: {
																kind: 'Name',
																value:
																	'lastNameFilter'
															}
														}
													}
												]
											}
										}
									]
								}
							}
						],
						directives: [],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'edges' },
									arguments: [],
									directives: [],
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: {
													kind: 'Name',
													value: 'node'
												},
												arguments: [],
												directives: [],
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value: 'id'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value:
																	'firstName'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value:
																	'lastName'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value:
																	'externalEmployeeId'
															},
															arguments: [],
															directives: []
														}
													]
												}
											}
										]
									}
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'totalCount' },
									arguments: [],
									directives: []
								}
							]
						}
					}
				]
			}
		}
	]
};
export const UpdateOneEmployeeDocument: DocumentNode<
	UpdateOneEmployeeMutation,
	UpdateOneEmployeeMutationVariables
> = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'updateOneEmployee' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'input' }
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: {
								kind: 'Name',
								value: 'UpdateOneEmployeeInput'
							}
						}
					},
					directives: []
				}
			],
			directives: [],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'updateOneEmployee' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'input' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'input' }
								}
							}
						],
						directives: [],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: {
										kind: 'Name',
										value: 'externalEmployeeId'
									},
									arguments: [],
									directives: []
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'isActive' },
									arguments: [],
									directives: []
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'isArchived' },
									arguments: [],
									directives: []
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'firstName' },
									arguments: [],
									directives: []
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'lastName' },
									arguments: [],
									directives: []
								}
							]
						}
					}
				]
			}
		}
	]
};
export const UpdateOneEmployeeJobPostDocument: DocumentNode<
	UpdateOneEmployeeJobPostMutation,
	UpdateOneEmployeeJobPostMutationVariables
> = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'updateOneEmployeeJobPost' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'input' }
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: {
								kind: 'Name',
								value: 'UpdateOneEmployeeJobPostInput'
							}
						}
					},
					directives: []
				}
			],
			directives: [],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: {
							kind: 'Name',
							value: 'updateOneEmployeeJobPost'
						},
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'input' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'input' }
								}
							}
						],
						directives: [],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'employeeId' },
									arguments: [],
									directives: []
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'jobPostId' },
									arguments: [],
									directives: []
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'isActive' },
									arguments: [],
									directives: []
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'isArchived' },
									arguments: [],
									directives: []
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'isApplied' },
									arguments: [],
									directives: []
								},
								{
									kind: 'Field',
									name: {
										kind: 'Name',
										value: 'appliedDate'
									},
									arguments: [],
									directives: []
								}
							]
						}
					}
				]
			}
		}
	]
};
export const DeleteManyUpworkJobsSearchCriteriaDocument: DocumentNode<
	DeleteManyUpworkJobsSearchCriteriaMutation,
	DeleteManyUpworkJobsSearchCriteriaMutationVariables
> = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'deleteManyUpworkJobsSearchCriteria' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'input' }
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: {
								kind: 'Name',
								value: 'DeleteManyUpworkJobsSearchCriteriaInput'
							}
						}
					},
					directives: []
				}
			],
			directives: [],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: {
							kind: 'Name',
							value: 'deleteManyUpworkJobsSearchCriteria'
						},
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'input' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'input' }
								}
							}
						],
						directives: [],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: {
										kind: 'Name',
										value: 'deletedCount'
									},
									arguments: [],
									directives: []
								}
							]
						}
					}
				]
			}
		}
	]
};
export const CreateManyUpworkJobsSearchCriteriaDocument: DocumentNode<
	CreateManyUpworkJobsSearchCriteriaMutation,
	CreateManyUpworkJobsSearchCriteriaMutationVariables
> = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'createManyUpworkJobsSearchCriteria' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'input' }
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: {
								kind: 'Name',
								value: 'CreateManyUpworkJobsSearchCriteriaInput'
							}
						}
					},
					directives: []
				}
			],
			directives: [],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: {
							kind: 'Name',
							value: 'createManyUpworkJobsSearchCriteria'
						},
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'input' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'input' }
								}
							}
						],
						directives: [],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'id' },
									arguments: [],
									directives: []
								}
							]
						}
					}
				]
			}
		}
	]
};
export const JobPostsDocument: DocumentNode<
	JobPostsQuery,
	JobPostsQueryVariables
> = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'jobPosts' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'providerCodeFilter' }
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'String' }
						}
					},
					directives: []
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'providerJobIdFilter' }
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'String' }
						}
					},
					directives: []
				}
			],
			directives: [],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'jobPosts' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'filter' },
								value: {
									kind: 'ObjectValue',
									fields: [
										{
											kind: 'ObjectField',
											name: {
												kind: 'Name',
												value: 'providerCode'
											},
											value: {
												kind: 'ObjectValue',
												fields: [
													{
														kind: 'ObjectField',
														name: {
															kind: 'Name',
															value: 'eq'
														},
														value: {
															kind: 'Variable',
															name: {
																kind: 'Name',
																value:
																	'providerCodeFilter'
															}
														}
													}
												]
											}
										},
										{
											kind: 'ObjectField',
											name: {
												kind: 'Name',
												value: 'providerJobId'
											},
											value: {
												kind: 'ObjectValue',
												fields: [
													{
														kind: 'ObjectField',
														name: {
															kind: 'Name',
															value: 'eq'
														},
														value: {
															kind: 'Variable',
															name: {
																kind: 'Name',
																value:
																	'providerJobIdFilter'
															}
														}
													}
												]
											}
										}
									]
								}
							}
						],
						directives: [],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'edges' },
									arguments: [],
									directives: [],
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: {
													kind: 'Name',
													value: 'node'
												},
												arguments: [],
												directives: [],
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value: 'id'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value:
																	'isActive'
															},
															arguments: [],
															directives: []
														},
														{
															kind: 'Field',
															name: {
																kind: 'Name',
																value:
																	'isArchived'
															},
															arguments: [],
															directives: []
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
};
