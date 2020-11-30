import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { BookAddModifyPage } from './book-add-modify.page';
import { BookAddModifyPageRoutingModule } from './book-add-modify-routing.module';

@NgModule({
    imports: [
        BookAddModifyPageRoutingModule,
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule
    ],
  declarations: [BookAddModifyPage]
})
export class BookAddModifyPageModule {}
