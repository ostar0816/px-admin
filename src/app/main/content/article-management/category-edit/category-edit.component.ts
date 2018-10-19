import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';

import { pyxisAnimations } from '@pyxis/animations';
import { PyxisUtils } from '@pyxis/utils';

import { Category } from './category.model';
import { CategoryEditService } from './category-edit.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: pyxisAnimations
})
export class CategoryEditComponent implements OnInit, OnDestroy {  
  category = new Category();
  onCategoryChanged: Subscription;
  pageType: string;
  categoryForm: FormGroup;
  selectedFile: File = null;
  selectedFileName: string;

  constructor(
    private categoryEditService: CategoryEditService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router,

  ) {}
  
  ngOnInit() {
    this.onCategoryChanged = this.categoryEditService.onCategoryChanged.subscribe(res => {
      if (res) {
        this.category = new Category(res.data);
        this.pageType = 'edit';
      }
      else {
        this.pageType = 'new';
        this.category = new Category();
      }

      this.categoryForm = this.createCategoryForm();
    });
  }

  ngOnDestroy() {
    this.onCategoryChanged.unsubscribe();
  }

  createCategoryForm() {
    return this.formBuilder.group({
      _id: [this.category._id],
      mark: null,
      title: [this.category.title],
      description: [this.category.description],
      countOfArticles: [this.category.countOfArticles]
    });
  }

  saveCategory() {
    const data = this.categoryForm.getRawValue();

    data.mark = this.category.mark;
    data.updatedAt = new Date();

    this.categoryEditService.saveCategory(data).subscribe(res => {
      this.snackBar.open('Category saved', 'OK', {
        verticalPosition: 'top',
        duration: 3000
      });
    });
  }

  addCategory() {
    const data = this.categoryForm.getRawValue();

    this.category.title = data.title;
    this.category.description = data.description;
    this.category.updatedAt = new Date();

    this.categoryEditService.addCategory(this.category).subscribe(res => {
      this.categoryEditService.onCategoryChanged.next(data);

      this.snackBar.open('Category added', 'OK', {
        verticalPosition: 'top',
        duration: 2000
      });

      this.router.navigate(['article-management/categories']);
    });
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];

    this.categoryEditService.uploadImage(this.selectedFile, this.category).subscribe(res => {
      if (res['result']['success']) {
        this.category.mark = res['data'];
      }
    });
  }
}