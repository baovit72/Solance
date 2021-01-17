import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import {
	ICandidateExperience,
	IExperienceCreateInput,
	IExperienceFindInput
} from '@gauzy/models';

@Injectable({
	providedIn: 'root'
})
export class CandidateExperienceService {
	constructor(private http: HttpClient) {}

	create(createInput: IExperienceCreateInput): Promise<ICandidateExperience> {
		return this.http
			.post<ICandidateExperience>(
				'/api/candidate-experience',
				createInput
			)
			.pipe(first())
			.toPromise();
	}

	getAll(
		findInput?: IExperienceFindInput,
		relations?: string[]
	): Promise<{ items: any[]; total: number }> {
		const data = JSON.stringify({ findInput, relations });
		return this.http
			.get<{ items: ICandidateExperience[]; total: number }>(
				`/api/candidate-experience`,
				{
					params: { data }
				}
			)
			.pipe(first())
			.toPromise();
	}

	update(id: string, updateInput: any): Promise<any> {
		return this.http
			.put(`/api/candidate-experience/${id}`, updateInput)
			.pipe(first())
			.toPromise();
	}

	delete(id: string): Promise<any> {
		return this.http
			.delete(`/api/candidate-experience/${id}`)
			.pipe(first())
			.toPromise();
	}
}
