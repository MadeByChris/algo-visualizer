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

  @ViewChildren('tile') components: QueryList<TileComponent>;
  tiles: TileComponent[];
  isLocked: boolean = false;
  constructor() {
  }
  adjacent: number[][];

  ngAfterViewInit() {
    this.tiles = this.components.toArray();

    //Set the start and end tiles
    this.tiles[Math.floor(this.tiles.length / 2)].setValue("start");
    this.tiles[Math.floor(this.tiles.length / 2)].setStyle("btn-start");

    this.tiles[0].setValue("end");
    this.tiles[0].setStyle("btn-end");
    this.adjacent = new Array(this.tiles.length);

    console.log(this.tiles.length);
    for (let i = 0; i < this.tiles.length; i++) {
      this.adjacent[i] = [];
    }
    console.log(this.adjacent[0]);
    console.log(this.adjacent);
    this.adjacent[0].push(1);
    console.log(this.adjacent);
    console.log(this.adjacent[0]);
    console.log(this.adjacent[1]);
    this.addAdjacents();
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

  addAdjacents() {
    // console.log(this.boardTemplate.length);
    for (let i = 0; i < this.boardTemplate.length; i++) {
      for (let j = 0; j < this.boardTemplate[i].length; j++) {
        // if (adj1 === undefined) continue;
        let index = this.getIndex(i, j);
        let tile = this.tiles[index]
        let adj1 = this.tiles[this.getIndex(i + 1, j)]
        let adj2 = this.tiles[this.getIndex(i - 1, j)]
        let adj3 = this.tiles[this.getIndex(i, j + 1)]
        let adj4 = this.tiles[this.getIndex(i, j - 1)]
        // console.log(adj1);
        // console.log(adj2);
        // console.log(adj3);
        // console.log(adj4);
        console.log(this.getIndex(1, 0));
        // If index + 1 modular divisible by len of one row then don't take the next value
        // If index + 1 modular divisible by the len of one row + 1 then don't take the prev value
        if (
          adj1 !== undefined
          && (
            this.shouldBeChecked(adj1)
            || adj1.getValue() === "start"
            || adj1.getValue() === "end"
          )
        ) {
          // console.log(this.adjacent[index]);
          // console.log(this.adjacent);
          if (!this.adjacent[index].includes(this.getIndex(i + 1, j))) {
            this.adjacent[index].push(this.getIndex(i + 1, j))
          }
        }
        if (
          adj2 !== undefined
          && (
            this.shouldBeChecked(adj1)
            || adj2.getValue() === "start"
            || adj2.getValue() === "end"
          )
        ) {
          // console.log(this.adjacent[index]);
          // console.log(this.adjacent);
          if (!this.adjacent[index].includes(this.getIndex(i - 1, j))) {
            this.adjacent[index].push(this.getIndex(i - 1, j))
          }
        }
        if (
          adj3 !== undefined
          && (
            this.shouldBeChecked(adj1)
            || adj3.getValue() === "start"
            || adj3.getValue() === "end"
          )
        ) {
          // console.log(this.adjacent[index]);
          // console.log(this.adjacent);
          if (!this.adjacent[index].includes(this.getIndex(i, j + 1)) && ((this.getIndex(i, j) + 1) % this.boardTemplate.length !== 0)) {
            this.adjacent[index].push(this.getIndex(i, j + 1))
          }
        }
        if (
          adj4 !== undefined
          && (
            this.shouldBeChecked(adj1)
            || adj4.getValue() === "start"
            || adj4.getValue() === "end"
          )
        ) {
          if (!this.adjacent[index].includes(this.getIndex(i, j - 1)) && ((this.getIndex(i, j)) % this.boardTemplate.length !== 0)) {
            this.adjacent[index].push(this.getIndex(i, j - 1))
          }
        }
        // let tile: TileComponent = this.tiles[i]
        // if((this.shouldBeChecked(tile) || tile.getValue() === "start" || tile.getValue() === "end"))  {
        // if ((this.shouldBeChecked(this.tiles[this.getIndex(i, j)]) || tile.getValue() === "start" || tile.getValue() === "end")) {

        //   //   }

        //   // }
        // }
      }
      console.log(this.adjacent);
    }
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
      this.startBFS(i, j);
    }
    selectedTile.flip();
  }

  shouldBeChecked(tile: TileComponent) {
    // console.log("checking:");
    // console.log(tile);
    if (tile.getValue() === undefined || tile.getValue() === null) return false;
    // console.log(true);
    return tile.getValue() === "path" || tile.getValue() === "";
  }
  isAdded(cur: number[], next: number[]) {
    console.log(this.adjacent[this.getIndex(cur[0], cur[1])]);
  }

  addEdges(i: number, j: number) {
    let tile: TileComponent | undefined = this.tiles[this.getIndex(i, j)];
    // console.log(tile.getValue() === "start");
    if (this.shouldBeChecked(tile) || tile.getValue() === "start") {
      // console.log("checking");
      // tile.setValue("checked"); //TODO: fix bug where start turns to a wall (don't set value and make new var to check if it should be checked or not)
      // tile.setStyle("btn-checked");
      // await this.wait(300)
      // if (!this.isAdded([i, j], [i, j - 1])) {

      // }
      // if (this.isAdjacent(i, j - 1)) {

      // }
      // this.addEdges(i, j - 1);
      // this.addEdges(i, j + 1);
      // this.addEdges(i - 1, j);
      // this.addEdges(i + 1, j);

    }
  }

  isAdjacent(i: number, j: number): boolean {
    return true;
  }
  /**
   * Runs Djikstra's algorithm on the board.
   * @returns void
   */
  async startBFS(i: number, j: number) {
    if (this.isLocked) return;
    this.isLocked = true;
    this.addEdges(i, j);
    console.log("BFS commencing");
    this.runBFS(i, j, []/*add adjacent dummy data*/);
  }
  async runBFS(i: number, j: number, adjacent) {
    //Get current index
    let middle: TileComponent | undefined = this.tiles[this.getIndex(i, j)];
    if (middle === undefined) return false;
    // console.log(tile.getValue() === "start");
    // if (this.shouldBeChecked(tile) || tile.getValue() === "start") {
    //   console.log("checking");
    //   tile.setValue("checked"); //TODO: fix bug where start turns to a wall (don't set value and make new var to check if it should be checked or not)
    //   tile.setStyle("btn-checked");
    //   await this.wait(300)
    //   this.runBFS(i, j - 1);
    //   this.runBFS(i, j + 1);
    //   this.runBFS(i - 1, j);
    //   this.runBFS(i + 1, j);
    // }
    let len = this.tiles.length
    let queue = [];
    let visited = Array(len).fill(false);
    let distance = Array(len).fill(Math.max());
    let previous = Array(len).fill(-1);

    console.log(visited);
    console.log(visited.length);

    visited[this.getIndex(i, j)] = true;
    distance[this.getIndex(i, j)] = 0;
    queue.push(this.getIndex(i, j));
    while (queue.length > 0) {
      console.log("queue at 0: " + queue[0]);
      let u = queue[0];
      queue.splice(0, 1);
      for (let i = 0; i < adjacent[u][i]; i++) {
        if (visited[adjacent[u][i]] == false) {
          visited[adjacent[u][i]] = true;
          distance[adjacent[u][i]] = distance[u] + 1;
          previous[adjacent[u][i]] = u;
          if (adjacent[u][i] == 0) {
            return true;
          };
        }
      }
    }
    return false;
  }



  wait(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}
