import { Component, OnInit, NgModule, ViewChild, ElementRef } from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  boardTemplate: any[] = [];
  
  @ViewChildren('tile') components:QueryList<TileComponent>;
  tiles: TileComponent[];

  constructor() {
  }

  ngAfterViewInit(){
      this.tiles = this.components.toArray();

      //Set the start and end tiles
      this.tiles[Math.floor(this.tiles.length / 2)].setValue("start");
      this.tiles[Math.floor(this.tiles.length / 2)].setStyle("btn-start");

      this.tiles[0].setValue("end");
      this.tiles[0].setStyle("btn-end");

    }

  ngOnInit(): void {
    this.newBoard();
  }

  newBoard() {
    this.boardTemplate = Array(7).fill((Array(7).fill(null)));
  }

  /**
   * Handles the logic for when a tile is clicked in the GUI.
   * @param i column value
   * @param j row value
   */
  handleTileClick(i: number, j: number) {
    let tileIndex: number = (i * this.boardTemplate.length) + j;
    this.flipTile(tileIndex);
  }

  /**
   * Flips the value of the tile between wall and path.
   * @param tileIndex 
   */
  flipTile(tileIndex: number) {
    let selectedTile: TileComponent = this.tiles[tileIndex];
    selectedTile.flip();
  }
}
