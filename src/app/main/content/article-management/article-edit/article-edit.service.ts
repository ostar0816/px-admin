import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from 'environments/environment';
import { Article } from './article.model';

import * as _ from 'lodash';
import { AuthService } from 'app/service/auth.service';

@Injectable()
export class ArticleEditService implements Resolve<any>
{
  routeParams: any;
  categoryInfo: any = {};
  article: any;
  onArticleChanged: BehaviorSubject<any> = new BehaviorSubject({});
  onCategoryInfoChanged: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.categoryInfo.selectedCategory = '';
    this.categoryInfo.categories = [];
  }

  /**
   * Resolve
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    this.routeParams = route.params;

    return new Promise((resolve, reject) => {

      Promise.all([
        this.getCategoryInfo(),
        this.getArticle()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getCategoryInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.toApiUrl('categories')).subscribe((res: any) => {
        this.categoryInfo.categories = _.map(res.data, function (category) {
          return {
            value: category._id,
            showString: category.title
          }
        });

        if (this.routeParams.categoryId !== undefined) {
          this.categoryInfo.selectedCategory = this.routeParams.categoryId;
        } else {
          this.categoryInfo.selectedCategory = this.categoryInfo.categories[0].value;
        }

        this.onCategoryInfoChanged.next(this.categoryInfo);

        resolve(this.categoryInfo);
      }, reject);
    });
  }

  getArticle(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.routeParams.id === 'new') {
        this.onArticleChanged.next(false);
        resolve(false);
      }
      else {
        this.http.get(this.toApiUrl('article/get/') + this.routeParams.id).subscribe((response: any) => {
          this.article = response;
          this.onArticleChanged.next(this.article);
          resolve(response);
        }, reject);
      }
    });
  }

  saveArticle(article) {
    let token = this.authService.getToken();

    return this.http.put(
      this.toApiUrl('article/update/' + article._id),
      article,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-access-token': token
        })
      }
    );
  }

  addArticle(article) {
    let token = this.authService.getToken();

    return this.http.post(
      this.toApiUrl('article/add'),
      article,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-access-token': token
        })
      }
    );
  }

  uploadMark(mark: File, article: Article) {
    let token = this.authService.getToken();

    const formData = new FormData();
    formData.append('mark', mark);

    return this.http.put(
      this.toApiUrl('article/' + article._id + '/upload_mark'),
      formData,
      {
        headers: new HttpHeaders({
          'x-access-token': token
        })
      }
    );
  }

  toApiUrl(href): string {
    return environment.apiBaseUrl + href;
  }

  toLink(title): string {
    let link = title.toLowerCase();
    link = link.replace(' ', '-');
    return link;
  }

  uploadImage(image: File) {
    let token = this.authService.getToken();

    const formData = new FormData();
    formData.append('image', image);

    return this.http.put(
      this.toApiUrl('article/upload_image'),
      formData,
      {
        headers: new HttpHeaders({
          'x-access-token': token
        })
      }
    );
  }
}
