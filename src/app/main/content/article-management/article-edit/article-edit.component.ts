import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { XhrFactory } from '@angular/common/http';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';

import { pyxisAnimations } from '@pyxis/animations';
import { PyxisUtils } from '@pyxis/utils';

import { Article } from './article.model';
import { ArticleEditService } from './article-edit.service';
import { environment } from 'environments/environment';

import { PyxisConfigService } from '@pyxis/services/config.service';

declare var tinymce: any;

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: pyxisAnimations
})
export class ArticleEditComponent implements OnInit, OnDestroy {
  article = new Article();
  onArticleChanged: Subscription;
  onCategoryInfoChanged: Subscription;
  pageType: string;
  articleForm: FormGroup;
  categories: Array<any> = [];
  selectedCategory: string;
  articleContent: string;
  hostUrl = environment.hostUrl;

  tinymceSettings = {
    height: 320,
    menubar: false,
    plugins: 'image code',
    block_formats: 'Title=h1; Description=h3; Content=p;',
    toolbar: 'undo redo | link image | code',
    image_title: true,
    automatic_uploads: true,
    file_picker_types: 'image',

    images_upload_handler: function (blobInfo, success, failure) {
      var xhr, formData;

      xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('PUT', environment.apiBaseUrl + 'upload_image/' + blobInfo.filename());
      xhr.setRequestHeader('x-access-token', localStorage.getItem('token'));

      xhr.onload = function () {
        var json;

        if (xhr.status != 200) {
          failure('HTTP Error: ' + xhr.status);
          return;
        }

        json = JSON.parse(xhr.responseText);

        success(json.data);
      };

      formData = new FormData();
      formData.append('image', blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    },

    content_css: [
      'https://fonts.googleapis.com/css?family=Maven Pro',
      this.hostUrl + 'assets/css/tinymce.css'
    ],

    file_picker_callback: function (cb, value, meta) {
      var input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');

      input.onchange = function () {
        var file = input.files[0];

        var reader = new FileReader();
        reader.onload = function () {
          var id = 'blobid' + (new Date()).getTime();
          var blobCache = tinymce.activeEditor.editorUpload.blobCache;
          var base64 = (<string>reader.result).split(',')[1];
          var blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);

          cb(blobInfo.blobUri(), { title: file.name });
        };
        reader.readAsDataURL(file);
      };

      input.click();
    }
  }

  constructor(
    private articleEditService: ArticleEditService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router,
    private pyxisConfig: PyxisConfigService

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
    this.onCategoryInfoChanged = this.articleEditService.onCategoryInfoChanged.subscribe(res => {
      if (res) {
        this.categories = res.categories;
        this.selectedCategory = res.selectedCategory;
      }
    });

    this.onArticleChanged = this.articleEditService.onArticleChanged.subscribe(res => {
      if (res) {
        this.pageType = 'edit';
        this.article = new Article(res.data);
        this.selectedCategory = this.article.categoryId;
        this.articleContent = this.article.content;
      }
      else {
        this.pageType = 'new';
        this.article = new Article();
        this.articleContent = this.article.content;
      }

      this.articleForm = this.createArticleForm();
    });
  }

  ngOnDestroy() {
    this.onArticleChanged.unsubscribe();
  }

  createArticleForm() {
    return this.formBuilder.group({
      _id: [this.article._id],
      title: [this.article.title],
      description: [this.article.description]
    });
  }

  saveArticle() {
    const data = this.articleForm.getRawValue();

    this.article.title = data.title;
    this.article.description = data.description;
    this.article.content = this.articleContent;
    this.article.categoryId = this.selectedCategory;
    this.article.updatedAt = new Date();

    this.articleEditService.saveArticle(this.article).subscribe(res => {
      this.snackBar.open('Article saved', 'OK', {
        verticalPosition: 'top',
        duration: 3000
      });
    });
  }

  addArticle() {
    const data = this.articleForm.getRawValue();

    this.article.title = data.title;
    this.article.description = data.description;
    this.article.content = this.articleContent;
    this.article.categoryId = this.selectedCategory;

    this.articleEditService.addArticle(this.article).subscribe(res => {
      this.snackBar.open('Article added', 'OK', {
        verticalPosition: 'top',
        duration: 2000
      });

      this.router.navigate([('article-management/category/' + this.selectedCategory)]);
    });
  }
}