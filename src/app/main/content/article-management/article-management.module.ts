import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CdkTableModule } from '@angular/cdk/table';

import {
  MatButtonModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatRippleModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatMenuModule,
  MatSnackBarModule,
} from '@angular/material';

import { PyxisSharedModule } from '@pyxis/shared.module';
import { PyxisConfirmDialogModule } from '@pyxis/components/confirm-dialog/confirm-dialog.module';
import { EditorModule } from '@tinymce/tinymce-angular';

import { AuthGuardService } from 'app/service/auth-guard.service';

import { CategoriesComponent } from './categories/categories.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryComponent } from './category/category.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';

import { CategoriesService } from './categories/categories.service';
import { CategoryService } from './category/category.service';
import { CategoryEditService } from './category-edit/category-edit.service';
import { ArticleEditService } from './article-edit/article-edit.service';

const routes = [
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuardService],
    resolve: {
      data: CategoriesService
    }
  },
  {
    path: 'category/:id',
    component: CategoryComponent,
    canActivate: [AuthGuardService],
    resolve: {
      data: CategoryService
    }
  },
  {
    path: 'category-edit/:id',
    component: CategoryEditComponent,
    canActivate: [AuthGuardService],
    resolve: {
      data: CategoryEditService
    }
  },
  {
    path: 'article-edit/:id',
    component: ArticleEditComponent,
    canActivate: [AuthGuardService],
    resolve: {
      data: ArticleEditService
    }
  },
  {
    path: 'article-edit/:id/:categoryId',
    component: ArticleEditComponent,
    canActivate: [AuthGuardService],
    resolve: {
      data: ArticleEditService
    }
  },
  {
    path: '**',
    redirectTo: 'categories'
  }
];

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryComponent,
    ArticleEditComponent,
    CategoryEditComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    EditorModule,

    CdkTableModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatMenuModule,
    MatSnackBarModule,

    PyxisSharedModule,
    PyxisConfirmDialogModule,
  ],
  providers: [
    CategoriesService,
    CategoryService,
    CategoryEditService,
    ArticleEditService,
    AuthGuardService,
  ]
})
export class ArticleManagementModule { }
