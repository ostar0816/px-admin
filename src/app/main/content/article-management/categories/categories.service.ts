import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from 'environments/environment'
import { AuthService } from 'app/service/auth.service';

@Injectable()
export class CategoriesService implements Resolve<any> {

  categories: any[];
  onCategoryChanged: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise((resolve, reject) => {

      Promise.all([
        this.getCategories()
      ]).then(
        () => { resolve(); }, reject
      );

    });

  }

  getCategories(): Promise<any> {

    return new Promise((resolve, reject) => {

      this.http.get(
        this.toApiUrl('categories'),
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }
      ).subscribe((response: any) => {

        this.categories = response.data;
        this.onCategoryChanged.next(this.categories);

        resolve(response);

      }, reject);

    });

  }

  deleteCategory(category) {
    let token = this.authService.getToken();
    this.http.delete(
      this.toApiUrl('category/delete/' + category._id),
      {
        headers: new HttpHeaders({
          'x-access-token': token
        })
      }
    ).subscribe(res => {
      const categoryIndex = this.categories.indexOf(category);
      this.categories.splice(categoryIndex, 1);

      this.onCategoryChanged.next(this.categories);
    })
  }

  toApiUrl(href): string {
    return environment.apiBaseUrl + href;
  }

}
