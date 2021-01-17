import { IHelpCenter } from '@gauzy/models';
import { Component, OnDestroy, Input, ErrorHandler } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TranslationBaseComponent } from '../../language-base/translation-base.component';
import { HelpCenterService } from '../../../@core/services/help-center.service';
import { HelpCenterArticleService } from '../../../@core/services/help-center-article.service';
import { HelpCenterAuthorService } from '../../../@core/services/help-center-author.service';

@Component({
	selector: 'ga-delete-category',
	templateUrl: 'delete-category.component.html',
	styleUrls: ['delete-category.component.scss']
})
export class DeleteCategoryComponent extends TranslationBaseComponent
	implements OnDestroy {
	@Input() category: IHelpCenter;
	private _ngDestroy$ = new Subject<void>();
	constructor(
		protected dialogRef: NbDialogRef<DeleteCategoryComponent>,
		readonly translateService: TranslateService,
		private helpCenterAuthorService: HelpCenterAuthorService,
		private helpCenterArticleService: HelpCenterArticleService,
		private helpCenterService: HelpCenterService,
		private errorHandler: ErrorHandler
	) {
		super(translateService);
	}

	closeDialog() {
		this.dialogRef.close();
	}

	async deleteCategory() {
		this.deleteArticles(this.category.id);
		try {
			await this.helpCenterService.delete(this.category.id);
		} catch (error) {
			this.errorHandler.handleError(error);
		}
		this.dialogRef.close(this.category);
	}

	async deleteArticles(id) {
		const result = await this.helpCenterArticleService.findByCategoryId(id);
		if (result) {
			let hasArticles = false;
			result.forEach(async (article) => {
				if (article.categoryId === this.category.id) {
					hasArticles = true;
					try {
						await this.helpCenterAuthorService.deleteBulkByArticleId(
							article.id
						);
					} catch (error) {
						this.errorHandler.handleError(error);
					}
				}
			});
			if (hasArticles)
				try {
					await this.helpCenterArticleService.deleteBulkByCategoryId(
						this.category.id
					);
				} catch (error) {
					this.errorHandler.handleError(error);
				}
		}
	}
	ngOnDestroy() {
		this._ngDestroy$.next();
		this._ngDestroy$.complete();
	}
}
