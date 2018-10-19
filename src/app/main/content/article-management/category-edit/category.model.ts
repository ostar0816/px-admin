import { MatChipInputEvent } from '@angular/material';
import { PyxisUtils } from '@pyxis/utils';
import { environment } from 'environments/environment';

export class Category {
  _id: string;
  mark: string;
  title: string;
  description: string;
  updatedAt: Date;
  countOfArticles: number;

  constructor(category?) {
    category = category || {};
    this._id = category._id || PyxisUtils.generateGUID();
    this.mark = category.mark || environment.apiBaseUrl + 'image/mark/default.svg';
    this.title = category.title || '';
    this.description = category.description || '';
    this.updatedAt = category.updatedAt || new Date();
    this.countOfArticles = category.countOfArticles || 0;
  }
}
