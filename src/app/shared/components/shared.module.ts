import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { PrimeNGModule } from '../../core/models/primeng.model';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TimelineComponent } from './timeline/timeline.component';
import { BadgeDialogComponent } from './badge-dialog/badge-dialog.component';

@NgModule({
  declarations: [
    SearchBarComponent,
    TimelineComponent,
    BadgeDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNGModule,
  ],
  exports: [SearchBarComponent,TimelineComponent] 

})
export class SharedModule { }
