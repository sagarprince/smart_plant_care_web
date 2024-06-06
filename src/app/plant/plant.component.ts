import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlantComponent {
  @Input() socket: WebSocket | undefined;
  @Input() index: number = 0;
  @Input() title: string = '';
  @Input() moistureReading: number = 0;
  @Input() watering: number = 0;
  @Input() overrideWatering: number = 0;

  constructor(private cd: ChangeDetectorRef) { }

  public toggleOverrideWatering(): void {
    this.overrideWatering = this.overrideWatering === 0 ? 1 : 0
    this.sendMessage(JSON.stringify({ "type": "TOGGLE_MOTOR_OVERRIDE", "index": this.index, "value": this.overrideWatering }));
    this.cd.markForCheck();
  }

  public toggleWatering(): void {
    this.watering = this.watering === 0 ? 1 : 0
    this.sendMessage(JSON.stringify({ "type": "TOGGLE_MOTOR", "index": this.index, "value": this.watering }));
    this.cd.markForCheck();
  }

  public sendMessage(message: string): void {
    if (this.socket?.OPEN) {
      this.socket!.send(message);
    }
  }
}
