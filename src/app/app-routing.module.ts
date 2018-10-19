import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'article-management',
    loadChildren: './main/content/article-management/article-management.module#ArticleManagementModule'
  },
  {
    path: 'team-management',
    loadChildren: './main/content/team/team.module#TeamModule'
  },
  {
    path: 'auth',
    loadChildren: './main/content/authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'subscribed-users',
    loadChildren: './main/content/coming-soon/coming-soon.module#ComingSoonModule'
  },
  {
    path: 'terms-of-use',
    loadChildren: './main/content/coming-soon/coming-soon.module#ComingSoonModule'
  },
  {
    path: 'privacy-policy',
    loadChildren: './main/content/coming-soon/coming-soon.module#ComingSoonModule'
  },
  {
    path: '**',
    redirectTo: 'article-management'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
