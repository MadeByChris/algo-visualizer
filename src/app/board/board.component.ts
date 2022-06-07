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
  isLocked: boolean = false;
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
    //Reset isLocked
    //Reset each tile
    //Reset board template
    this.boardTemplate = Array(7).fill((Array(7).fill("")));
  }
  getIndex(i: number, j: number): number {
    return (i * this.boardTemplate.length) + j;
  }
  /**
   * Handles the logic for when a tile is clicked in the GUI.
   * @param i column value
   * @param j row value
   */
  handleTileClick(i: number, j: number) {
    if (this.isLocked) return;
    let selectedTile: TileComponent = this.tiles[this.getIndex(i, j)];

    if (selectedTile.value === "start") {
      this.startDjikstras(i, j);
    }
    selectedTile.flip();
  }

  shouldBeChecked(tile: TileComponent) {
    return tile.getValue() === "path" || tile.getValue() === null || tile.getValue() === "";
  }

  /**
   * Runs Djikstra's algorithm on the board.
   * @returns void
   */
  async startDjikstras(i: number, j: number) {
    if (this.isLocked) return;
    this.isLocked = true;
    console.log("Djikstras commencing");
    this.runDjikstras(i, j);
  }
  async runDjikstras(i: number, j: number) {
    //Get current index
    let tile: TileComponent | undefined = this.tiles[this.getIndex(i, j)];
    if (tile === undefined) return;
    // console.log(tile.getValue() === "start");
    if (this.shouldBeChecked(tile) || tile.getValue() === "start") {
      console.log("checking");
      tile.setValue("checked"); //TODO: fix bug where start turns to a wall (don't set value and make new var to check if it should be checked or not)
      tile.setStyle("btn-checked");
      await this.wait(300)
      this.runDjikstras(i, j - 1);
      this.runDjikstras(i, j + 1);
      this.runDjikstras(i - 1, j);
      this.runDjikstras(i + 1, j);
    }
  }
  wait(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}
