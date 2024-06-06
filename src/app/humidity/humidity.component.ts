import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.scss']
})
export class HumidityComponent {
  @Input() title: string = '';
  @Input() reading: number = 0;
}
