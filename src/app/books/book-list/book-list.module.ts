import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { BookListPage } from './book-list.page';
import { BookListPageRoutingModule } from './book-list-routing.module';

@NgModule({
  imports: [
    BookListPageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [ BookListPage ]
})
export class BookListPageModule {}
