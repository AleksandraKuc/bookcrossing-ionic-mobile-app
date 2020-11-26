import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavigationPage } from './navigation.page';

const routes: Routes = [
  {
    path: 'navigation',
    component: NavigationPage,
    children: [
      {
        path: 'books',
        loadChildren: () => import('../../books/book-list/book-list.module').then(m => m.BookListPageModule)
      },
      {
        path: 'books/book-details/:id',
        loadChildren: () => import('../../books/book-details/book-details.module').then(m => m.BookDetailsPageModule)
      },
      {
        path: 'books/book-favourite',
        loadChildren: () => import('../../books/book-list/book-list.module').then(m => m.BookListPageModule)
      },
      {
        path: 'books/user-books',
        loadChildren: () => import('../../books/book-list/book-list.module').then(m => m.BookListPageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('../../users/user-list/user-list.module').then( m => m.UserListPageModule)
      },
      {
        path: 'users/user-details/:username',
        loadChildren: () => import('../../users/user-details/user-details.module').then( m => m.UserDetailsPageModule)
      },
      {
        path: 'user-profile',
        loadChildren: () => import('../../users/user-details/user-details.module').then( m => m.UserDetailsPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../../account/login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('../../account/register/register.module').then(m => m.RegisterPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'navigation/books',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavigationPageRoutingModule {}
