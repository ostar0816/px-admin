import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from 'environments/environment'
import { AuthService } from 'app/service/auth.service';

@Injectable()
export class CategoryService implements Resolve<any> {

  category: any;
  articles: any[];
  onArticleChanged: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise((resolve, reject) => {

      Promise.all([
        this.getArticles(route.params.id)
      ]).then(
        () => { resolve(); }, reject
      );

    });

  }

  getArticles(categoryId): Promise<any> {

    return new Promise((resolve, reject) => {

      this.http.get(this.toApiUrl('category/get/' + categoryId)).subscribe((res: any) => {
        this.category = res.data;
      });

      this.http.get(this.toApiUrl('articles/' + categoryId)).subscribe((res: any) => {
        this.articles = res.data;
        this.onArticleChanged.next(this.articles);

        resolve(res);
      }, reject);

    });

  }

  deleteArticle(article) {
    let token = this.authService.getToken();

    this.http.delete(
      this.toApiUrl('article/delete/' + article._id),
      {
        headers: new HttpHeaders({
          'x-access-token': token
        })
      }
    ).subscribe(res => {
      const articleIndex = this.articles.indexOf(article);
      this.articles.splice(articleIndex, 1);

      this.onArticleChanged.next(this.articles);
    });
  }

  toApiUrl(href): string {
    return environment.apiBaseUrl + href;
  }

}
