import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.newBoard();
  }

  newBoard() {
    this.squares = Array(9).fill(null);
  }

  flipTile(index: number) {
    console.log("hello")
    if (!this.squares[index]) {
      // this.squares.splice(index, 1, "clicked");
      this.squares[index].value = "wall";
    // } else if (this.squares[index].value === "wall") {
    //   this.squares[index] = !this.squares[index];
    // }
    }
  }
}
