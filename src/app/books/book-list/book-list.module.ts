import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookListPage } from './book-list.page';
import { BookListPageRoutingModule } from './book-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookListPageRoutingModule
  ],
  declarations: [ BookListPage ]
})
export class BookListPageModule {}
