import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NavigationPageRoutingModule } from './navigation-routing.module';

import { BookAddModifyPageModule } from '../../books/book-add-modify/book-add-modify.module';
import { NavigationPage } from './navigation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavigationPageRoutingModule,
    BookAddModifyPageModule,
  ],
  declarations: [NavigationPage]
})
export class NavigationPageModule {}
