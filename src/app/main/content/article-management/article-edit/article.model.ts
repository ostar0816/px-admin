import { MatChipInputEvent } from '@angular/material';
import { PyxisUtils } from '@pyxis/utils';

export class Article {
  _id: string;
  title: string;
  description: string;
  content: string;
  categoryId: string;
  updatedAt: Date;


  constructor(article?) {
    article = article || {};
    this._id = article._id || PyxisUtils.generateGUID();
    this.title = article.title || '';
    this.description = article.description || '';
    this.content = article.content || '';
    this.categoryId = article.categoryId || '';
    this.updatedAt = article.updatedAt || new Date();
  }
}
