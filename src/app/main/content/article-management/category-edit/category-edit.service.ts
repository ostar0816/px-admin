import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from 'environments/environment';
import { Category } from './category.model';

import { PyxisConfigService } from '@pyxis/services/config.service';
import { AuthService } from 'app/service/auth.service';

@Injectable()
export class CategoryEditService implements Resolve<any>
{
  routeParams: any;
  category: any;
  onCategoryChanged: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(
    private http: HttpClient,
    private pyxisConfig: PyxisConfigService,
    private authService: AuthService
  ) {
    this.pyxisConfig.setConfig({
      layout: {
        navigation: 'left',
        toolbar: 'below',
        footer: 'below'
      }
    });
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
        this.getCategory()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getCategory(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.routeParams.id === 'new') {
        this.onCategoryChanged.next(false);
        resolve(false);
      }
      else {
        this.http.get(this.toApiUrl('category/get/') + this.routeParams.id)
          .subscribe((response: any) => {
            this.category = response;
            this.onCategoryChanged.next(this.category);
            resolve(response);
          }, reject);
      }
    });
  }

  saveCategory(category) {
    let token = this.authService.getToken();

    return this.http.put(
      this.toApiUrl('category/update/' + category._id),
      category,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-access-token': token
        })
      }
    );
  }

  addCategory(category) {
    let token = this.authService.getToken();

    return this.http.post(
      this.toApiUrl('category/add'),
      category,
      {
        headers: new HttpHeaders({
          'x-access-token': token
        })
      }
    );
  }

  uploadImage(image: File, category: Category) {
    let token = this.authService.getToken();

    const formData = new FormData();
    formData.append('image', image);

    return this.http.put(
      this.toApiUrl('upload_image/' + category._id),
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
}
