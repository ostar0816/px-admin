import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatDialog, MatDialogRef } from '@angular/material';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { pyxisAnimations } from '@pyxis/animations';
import { PyxisUtils } from '@pyxis/utils';
import { PyxisConfigService } from '@pyxis/services/config.service';
import { PyxisConfirmDialogComponent } from '@pyxis/components/confirm-dialog/confirm-dialog.component';

import { CategoriesService } from './categories.service';
import { environment } from 'environments/environment'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  animations: pyxisAnimations
})
export class CategoriesComponent implements OnInit {
  dataSource: FilesDataSource | null;
  displayedColumns = ['mark', 'title', 'description', 'buttons'];
  confirmDialogRef: MatDialogRef<PyxisConfirmDialogComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
    private categoriesService: CategoriesService,
    private pyxisConfig: PyxisConfigService,
    public dialog: MatDialog
  ) {
    this.pyxisConfig.setConfig({
      layout: {
        navigation: 'left',
        toolbar: 'below',
        footer: 'below'
      }
    });
  }

  ngOnInit() {
    this.dataSource = new FilesDataSource(this.categoriesService, this.paginator, this.sort);

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  deleteCategory(category) {
    this.confirmDialogRef = this.dialog.open(PyxisConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this category?';

    this.confirmDialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.categoriesService.deleteCategory(category);
      }
      this.confirmDialogRef = null;
    });
  }
}

export class FilesDataSource extends DataSource<any>
{
  _filterChange = new BehaviorSubject('');
  _filteredDataChange = new BehaviorSubject('');

  get filteredData(): any {
    return this._filteredDataChange.value;
  }

  set filteredData(value: any) {
    this._filteredDataChange.next(value);
  }

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  constructor(
    private categoriesService: CategoriesService,
    private _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filteredData = this.categoriesService.categories;
  }

  connect(): Observable<any[]> {
    const displayDataChanges = [
      this.categoriesService.onCategoryChanged,
      this._paginator.page,
      this._filterChange,
      this._sort.sortChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      let data = this.categoriesService.categories.slice();

      data = this.filterData(data);

      this.filteredData = [...data];

      data = this.sortData(data);

      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  filterData(data) {
    if (!this.filter) {
      return data;
    }
    return PyxisUtils.filterArrayByString(data, this.filter);
  }

  sortData(data): any[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case 'categories':
          [propertyA, propertyB] = [a.categories[0], b.categories[0]];
          break;
        case 'price':
          [propertyA, propertyB] = [a.priceTaxIncl, b.priceTaxIncl];
          break;
        case 'quantity':
          [propertyA, propertyB] = [a.quantity, b.quantity];
          break;
        case 'active':
          [propertyA, propertyB] = [a.active, b.active];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

  disconnect() {
  }
}
