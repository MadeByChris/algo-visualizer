import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tile',
  template: `
    <button [ngClass]="btnStyle">{{this.htmlStr}}</button>
  `,
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
  @Input() value: string = "path";
  btnStyle = 'btn-path';
  htmlStr = "";
  getValue(): string {
    if (this.value === undefined) return null;
    return this.value;
  }

  setValue(value: string) {
    switch(value) {
      case "start":
        this.htmlStr = "Start"
        break;
      case "end":
        this.htmlStr = "End"
        break;
      default:
        break;
    }
    this.value = value;
  }
  getStyle(): string {
    return this.btnStyle;
  }
  setStyle(style: string) {
    //TODO: add check against enums
    this.btnStyle = style;
  }

  flip() {
    if (this.value !== "start" && this.value !== "end") {
      this.value = this.value !== "wall" ? "wall" : "";
      if (this.btnStyle == 'btn-wall') {
        this.btnStyle = 'btn-path';
      } else {
        this.btnStyle = 'btn-wall';
      }
    }
  }
}
