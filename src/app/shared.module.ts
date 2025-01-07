import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms'; 
import { PrimeNGModule } from './core/models/primeng.model';



@NgModule({
  declarations: [
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNGModule
  ],
  exports: [SearchBarComponent] 

})
export class SharedModule { }
