import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TimelineModule } from 'primeng/timeline';

@NgModule({
  imports: [
    InputTextModule,
    ListboxModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    TableModule,
    DialogModule,
    ToastModule,
    TimelineModule
  ],
  exports: [
    InputTextModule,
    ListboxModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    TableModule,
    DialogModule,
    ToastModule,
    TimelineModule
  ]
})
export class PrimeNGModule {}
