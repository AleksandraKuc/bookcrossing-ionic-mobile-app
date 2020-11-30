import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { BookDetailsPage } from './book-details.page';
import { BookDetailsPageRoutingModule } from './book-details-routing.module';

@NgModule({
    imports: [
        BookDetailsPageRoutingModule,
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    declarations: [ BookDetailsPage ]
})
export class BookDetailsPageModule {}
