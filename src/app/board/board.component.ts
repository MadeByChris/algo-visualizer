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

    // Set all tiles to have no adjacency
    this.adjacent = new Array(this.tiles.length);
    for (let i = 0; i < this.tiles.length; i++) {
      this.adjacent[i] = [];
    }
  }

  ngOnInit(): void {
    this.newBoard();
  }

  newBoard() {
    //Reset isLocked
    //Reset each tile
    //Reset board template
    this.boardTemplate = Array(9).fill((Array(9).fill("")));

  }

  addAdjacents() {
    // console.log(this.boardTemplate.length);
    for (let i = 0; i < this.boardTemplate.length; i++) {
      for (let j = 0; j < this.boardTemplate[i].length; j++) {
        let index = this.getIndex(i, j);
        let adj1 = this.tiles[this.getIndex(i + 1, j)]
        let adj2 = this.tiles[this.getIndex(i - 1, j)]
        let adj3 = this.tiles[this.getIndex(i, j + 1)]
        let adj4 = this.tiles[this.getIndex(i, j - 1)]

        // If index + 1 modular divisible by len of one row then don't take the next value
        // If index + 1 modular divisible by the len of one row + 1 then don't take the prev value
        if (
          adj1 !== undefined
          && adj1.getValue() !== "wall" 
          &&(
            this.shouldBeChecked(adj1)
            || adj1.getValue() === "start"
            || adj1.getValue() === "end"
          )
        ) {
          if (!this.adjacent[index].includes(this.getIndex(i + 1, j))) {
            this.adjacent[index].push(this.getIndex(i + 1, j))
          }
        }
        if (
          adj2 !== undefined
          && adj2.getValue() !== "wall"
          && (
            this.shouldBeChecked(adj2)
            || adj2.getValue() === "start"
            || adj2.getValue() === "end"
          )
        ) {
          if (!this.adjacent[index].includes(this.getIndex(i - 1, j))) {
            this.adjacent[index].push(this.getIndex(i - 1, j))
          }
        }
        if (
          adj3 !== undefined
          && adj3.getValue() !== "wall"
          && (
            this.shouldBeChecked(adj3)
            || adj3.getValue() === "start"
            || adj3.getValue() === "end"
          )
        ) {
          if (!this.adjacent[index].includes(this.getIndex(i, j + 1)) && ((this.getIndex(i, j) + 1) % this.boardTemplate.length !== 0)) {
            this.adjacent[index].push(this.getIndex(i, j + 1))
          }
        }
        if (
          adj4 !== undefined
          && adj4.getValue() !== "wall"
          && (
            this.shouldBeChecked(adj4)
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
      // Programatically add adjacent tiles to the adjacency matrix
      this.addAdjacents();
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

  /**
   * Runs BFS algorithm on the board.
   * @returns void
   */
  async startBFS(i: number, j: number) {
    if (this.isLocked) return;
    this.isLocked = true;
    // this.addEdges(i, j);
    console.log("BFS commencing");
    console.log(await this.runBFS(i, j, this.adjacent));
  }
  async runBFS(i: number, j: number, adjacent) {
    //Get current index
    let middle: TileComponent | undefined = this.tiles[this.getIndex(i, j)];
    if (middle === undefined) return false;

    let len = this.tiles.length
    let queue = [];
    let visited = Array(len).fill(false);
    let distance = Array(len).fill(Math.max());
    let previous = Array(len).fill(-1);
    visited[this.getIndex(i, j)] = true;
    distance[this.getIndex(i, j)] = 0;
    queue.push(this.getIndex(i, j));

    // While the queue is not empty continue doing BFS
    while (queue.length > 0) {
      let u = queue[0];
      queue.splice(0, 1);
      for (let i = 0; i < adjacent[u].length; i++) {
        if (adjacent[u][i] == 0) {
          return true;
        };
        if (visited[adjacent[u][i]] == false) {
          visited[adjacent[u][i]] = true;
          distance[adjacent[u][i]] = distance[u] + 1;
          previous[adjacent[u][i]] = u;
          queue.push(adjacent[u][i]);
          this.tiles[adjacent[u][i]].setValue("checked"); //TODO: fix bug where start turns to a wall (don't set value and make new var to check if it should be checked or not)
          this.tiles[adjacent[u][i]].setStyle("btn-checked");
          await this.wait(50);
          // If an adjacent tile to the target is found return true
          if (adjacent[u][i] == 0) {
            return true;
          };
        }
      }
      console.log(queue);
    }
    // If the queue is empty and the target hasn't been found return false;
    return false;
  }



  wait(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}
