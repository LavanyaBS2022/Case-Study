import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms'; 
import { PrimeNGModule } from './core/models/primeng.model';
import { TimelineComponent } from './shared/components/timeline/timeline.component';

@NgModule({
  declarations: [
    SearchBarComponent,
    TimelineComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNGModule,
  ],
  exports: [SearchBarComponent,TimelineComponent] 

})
export class SharedModule { }
