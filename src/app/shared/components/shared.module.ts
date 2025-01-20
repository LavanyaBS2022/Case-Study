import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { PrimeNGModule } from '../../core/models/primeng.model';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TimelineComponent } from './timeline/timeline.component';
import { BadgeDialogComponent } from './badge-dialog/badge-dialog.component';
import { OrderByPipe } from '../../core/pipes/order-by.pipe';

@NgModule({
  declarations: [
    SearchBarComponent,
    TimelineComponent,
    BadgeDialogComponent,
    OrderByPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNGModule,
  ],
  exports: [SearchBarComponent,TimelineComponent,BadgeDialogComponent] 

})
export class SharedModule { }
