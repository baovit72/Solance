import { IHelpCenter, IHelpCenterFind } from '@gauzy/models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class HelpCenterService {
	constructor(private http: HttpClient) {}

	create(createInput: IHelpCenter): Promise<IHelpCenter> {
		return this.http
			.post<IHelpCenter>('/api/help-center', createInput)
			.pipe(first())
			.toPromise();
	}

	getAll(
		relations?: string[],
		findInput?: IHelpCenterFind
	): Promise<{ items: any[]; total: number }> {
		const data = JSON.stringify({ relations, findInput });
		return this.http
			.get<{ items: IHelpCenter[]; total: number }>(`/api/help-center`, {
				params: { data }
			})
			.pipe(first())
			.toPromise();
	}

	updateBulk(
		oldChildren: IHelpCenter[],
		newChildren: IHelpCenter[]
	): Promise<IHelpCenter[]> {
		return this.http
			.post<IHelpCenter[]>('/api/help-center/updateBulk', {
				oldChildren,
				newChildren
			})
			.pipe(first())
			.toPromise();
	}

	update(id: string, updateInput: any): Promise<any> {
		return this.http
			.put(`/api/help-center/${id}`, updateInput)
			.pipe(first())
			.toPromise();
	}

	delete(id: string): Promise<any> {
		return this.http
			.delete(`/api/help-center/${id}`)
			.pipe(first())
			.toPromise();
	}

	findByBaseId(parentId: string): Promise<IHelpCenter[]> {
		return this.http
			.get<IHelpCenter[]>(`/api/help-center/${parentId}`)
			.pipe(first())
			.toPromise();
	}

	deleteBulkByBaseId(id: string): Promise<any> {
		const data = JSON.stringify({ id });
		return this.http
			.delete('/api/help-center/deleteBulkByBaseId', {
				params: { data }
			})
			.pipe(first())
			.toPromise();
	}
}
