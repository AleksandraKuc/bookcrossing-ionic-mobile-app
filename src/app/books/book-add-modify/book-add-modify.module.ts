import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookAddModifyPageRoutingModule } from './book-add-modify-routing.module';

import { BookAddModifyPage } from './book-add-modify.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BookAddModifyPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [BookAddModifyPage]
})
export class BookAddModifyPageModule {}
