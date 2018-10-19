import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { environment } from "environments/environment";

import { PyxisUtils } from '@pyxis/utils';
import * as _ from 'lodash';

import { Member } from './member.model';
import { AuthService } from 'app/service/auth.service';

@Injectable()
export class MembersService implements Resolve<any>
{
  onMembersChanged: BehaviorSubject<any> = new BehaviorSubject([]);
  onSelectedMembersChanged: BehaviorSubject<any> = new BehaviorSubject([]);
  onUserDataChanged: BehaviorSubject<any> = new BehaviorSubject([]);
  onSearchTextChanged: Subject<any> = new Subject();
  onFilterChanged: Subject<any> = new Subject();

  members: Member[];
  user: any;
  selectedMembers: string[] = [];

  searchText: string;
  filterBy: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {

      Promise.all([
        this.getMembers(),
      ]).then(
        ([files]) => {

          this.onSearchTextChanged.subscribe(searchText => {
            this.searchText = searchText;
            this.getMembers();
          });

          this.onFilterChanged.subscribe(filter => {
            this.filterBy = filter;
            this.getMembers();
          });

          resolve();

        },
        reject
      );
    });
  }

  getMembers(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.toApiUrl('members')).subscribe((res: any) => {
        this.members = res.data;

        if (this.searchText && this.searchText !== '') {
          this.members = PyxisUtils.filterArrayByString(this.members, this.searchText);
        }

        this.members = this.members.map(member => {
          return new Member(member);
        });

        this.onMembersChanged.next(this.members);
        resolve(this.members);
      }, reject);
    });
  }

  toggleSelectedMember(id) {
    if (this.selectedMembers.length > 0) {
      const index = this.selectedMembers.indexOf(id);

      if (index !== -1) {
        this.selectedMembers.splice(index, 1);

        this.onSelectedMembersChanged.next(this.selectedMembers);

        return;
      }
    }

    this.selectedMembers.push(id);

    this.onSelectedMembersChanged.next(this.selectedMembers);
  }

  toggleSelectAll() {
    if (this.selectedMembers.length > 0) {
      this.deselectMembers();
    }
    else {
      this.selectMembers();
    }
  }

  selectMembers(filterParameter?, filterValue?) {
    this.selectedMembers = [];

    if (filterParameter === undefined || filterValue === undefined) {
      this.selectedMembers = [];
      this.members.map(member => {
        this.selectedMembers.push(member._id);
      });
    }
    else {
      /* this.selectedMembers.push(...
           this.members.filter(todo => {
               return todo[filterParameter] === filterValue;
           })
       );*/
    }

    this.onSelectedMembersChanged.next(this.selectedMembers);
  }

  addMember(member) {
    let token = this.authService.getToken();

    return new Promise((resolve, reject) => {
      this.http.post(
        this.toApiUrl('member/add'),
        member,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-access-token': token
          })
        }
      ).subscribe(response => {
        this.getMembers();
        resolve(response);
      });
    });
  }

  updateMember(member) {
    let token = this.authService.getToken();

    return new Promise((resolve, reject) => {
      this.http.put(
        this.toApiUrl('member/update/' + member._id),
        member,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-access-token': token
          })
        }
      ).subscribe(response => {
        this.getMembers();
        resolve(response);
      });
    });
  }

  updateUserData(userData) {
    let token = this.authService.getToken();

    return new Promise((resolve, reject) => {
      this.http.post(
        this.toApiUrl('members-user/' + this.user.id),
        { ...userData },
        {
          headers: new HttpHeaders({
            'x-access-token': token
          })
        }
      ).subscribe(response => {
        this.getMembers();
        resolve(response);
      });
    });
  }

  deselectMembers() {
    this.selectedMembers = [];

    this.onSelectedMembersChanged.next(this.selectedMembers);
  }

  deleteMember(member) {
    let token = this.authService.getToken();

    this.http.delete(
      this.toApiUrl('member/delete/' + member._id),
      {
        headers: new HttpHeaders({
          'x-access-token': token
        })
      }
    ).subscribe(res => {
      const memberIndex = this.members.indexOf(member);
      this.members.splice(memberIndex, 1);

      this.onMembersChanged.next(this.members);
    });
  }

  deleteSelectedMembers() {
    for (const memberId of this.selectedMembers) {
      const member = this.members.find(_member => {
        return _member._id === memberId;
      });
      const memberIndex = this.members.indexOf(member);
      this.members.splice(memberIndex, 1);
    }
    this.onMembersChanged.next(this.members);
    this.deselectMembers();
  }

  uploadImage(image: File, member: Member) {
    let token = this.authService.getToken();

    const formData = new FormData();
    formData.append('image', image);

    return this.http.put(
      this.toApiUrl('upload_image/' + member._id),
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

}
