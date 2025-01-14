import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-badge-dialog',
  standalone: false,
  
  templateUrl: './badge-dialog.component.html',
  styleUrl: './badge-dialog.component.scss'
})
export class BadgeDialogComponent {
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<void>();
}
