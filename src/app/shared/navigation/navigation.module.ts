import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { BookAddModifyPageModule } from '../../books/book-add-modify/book-add-modify.module';
import { NavigationPage } from './navigation.page';
import { NavigationPageRoutingModule } from './navigation-routing.module';

@NgModule({
  imports: [
    BookAddModifyPageModule,
    CommonModule,
    FormsModule,
    IonicModule,
    NavigationPageRoutingModule,
  ],
  declarations: [NavigationPage]
})
export class NavigationPageModule {}
