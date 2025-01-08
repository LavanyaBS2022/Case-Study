import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-timeline',
  standalone: false,
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  @Input() patient: any;

  formatDate(date: string): string {
    console.log(date)
    const dateObj = new Date(date);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
  }
  onViewAll(){
    console.log('onViewAll clicked')
  }
}
