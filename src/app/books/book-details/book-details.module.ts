import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { BookDetailsPage } from './book-details.page';
import { BookDetailsPageRoutingModule } from './book-details-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BookDetailsPageRoutingModule,
    ],
    declarations: [ BookDetailsPage ]
})
export class BookDetailsPageModule {}
