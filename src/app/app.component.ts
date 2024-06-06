import { Component, OnDestroy, OnInit, WritableSignal, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public socket: WebSocket | undefined;
  private host: string = '192.168.4.1';
  private url: string = '';
  public moistureReadings: WritableSignal<number[]> = signal([]);
  public motors: WritableSignal<number[]> = signal([]);
  public motorOverrides: WritableSignal<number[]> = signal([]);
  public temperature: WritableSignal<number> = signal(0);
  public humidity: WritableSignal<number> = signal(0);

  constructor() {
    this.initWebSocket();
  }

  public ngOnInit(): void {

  }

  private initWebSocket(): void {
    this.url = `ws://${this.host}/ws`;
    this.socket = new WebSocket(this.url);
    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onclose = this.onClose.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
  }

  private onOpen(event: any) {
    console.log('Connection opened');
  }

  private onClose(event: any) {
    console.log('Connection closed');
    setTimeout(this.initWebSocket.bind(this), 2000);
  }

  private onMessage(event: any) {
    if (event.data) {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data) {
        this.moistureReadings.set(data.moistureReadings || []);
        this.motors.set(data.motors || []);
        this.motorOverrides.set(data.motorOverrides || []);
        this.temperature.set(data.temperature || 0);
        this.humidity.set(data.humidity || 0);
      }
    }
  }

  public trackByIndex(index: number, item: any): number {
    return index;
  }

  public ngOnDestroy(): void {

  }
}
