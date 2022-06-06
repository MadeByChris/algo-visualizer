import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tile',
  template: `
    <button nbButton *ngIf="!value" (click)="flip()">{{ value }}</button>
    <button nbButton hero status="success" *ngIf="value == 'wall'">{{ value }}</button>
    <!-- <button nbButton hero status="info">{{ value }}</button> -->


  `,
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
  @Input() value: string = "";
  flip() {
    this.value = this.value === "" ? "wall" : "";
    console.log(this.value);
  }
}
