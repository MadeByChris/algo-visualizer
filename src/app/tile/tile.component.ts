import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tile',
  template: `
    <button [ngClass]="btnStyle" (click)="flip()">{{ value }}</button>
    <!-- <button   *ngIf="value == 'wall'">{{ value }}</button> -->
    <!-- <button nbButton hero status="info">{{ value }}</button> -->


  `,
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
  @Input() value: string = "";
  btnStyle = 'btn-default';

  flip() {
    this.value = this.value !== "wall" ? "wall" : "";
    console.log(this.value);
    if(this.btnStyle == 'btn-change') {
      this.btnStyle = 'btn-default';
      console.log(this.btnStyle);
    } else {
      this.btnStyle = 'btn-change';
      console.log(this.btnStyle);
    }
  }
}
