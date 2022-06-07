import { Component, OnInit, NgModule, ViewChild, ElementRef } from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: any[] = [];
  
  @ViewChildren('tile') components:QueryList<TileComponent>;

  ngAfterViewInit(){
      console.log(this.components.toArray());
  }

  constructor() {
  }

  ngOnInit(): void {
    this.newBoard();
  }


  newBoard() {
    this.squares = Array(7).fill((Array(7).fill(null)));
  }

  flipTile(i: number, j: number) {
    console.log(i, j);
    console.log(this.squares[i][j]);
    console.log(this.components.toArray()[(j * 7) + i]);
    this.components.toArray()[(i * 7) + j].flip();
  }
}
