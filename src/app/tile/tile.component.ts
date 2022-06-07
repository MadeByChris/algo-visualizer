import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tile',
  template: `
    <button [ngClass]="btnStyle">{{ value }}</button>
  `,
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
  @Input() value: string = "path";
  btnStyle = 'btn-path';
  getValue() :string {
    return this.value;
  }
  setValue(value: string) {
    this.value = value;
  }
  getStyle() :string {
    return this.btnStyle;
  }
  setStyle(style: string) {
    //TODO: add check against enums
    this.btnStyle = style;
  }
  
  flip() {
    if (this.value !== "start" && this.value !== "end") {
      this.value = this.value !== "wall" ? "wall" : "";
      if(this.btnStyle == 'btn-wall') {
        this.btnStyle = 'btn-path';
      } else {
        this.btnStyle = 'btn-wall';
      }
    }
  }
}
