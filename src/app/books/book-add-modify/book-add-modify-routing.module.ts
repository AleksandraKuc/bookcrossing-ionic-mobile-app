import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookAddModifyPage } from './book-add-modify.page';

const routes: Routes = [
  {
    path: '',
    component: BookAddModifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookAddModifyPageRoutingModule {}
