import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board: string[][] = [[]];

  constructor() {
    for (let x = 0; x < 10; x++) {
      this.board[x] = [];
      for (let y = 0; y < 10; y++) {
        this.board[x][y] = 'A';
      }
    }
  }

  ngOnInit(): void {
  }

}
