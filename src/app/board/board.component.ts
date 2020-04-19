import {Component, OnInit} from '@angular/core';
import {PieceComponent} from '../piece/piece.component';
import {Piece} from '../piece/piece';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board: object[][] = [[]];

  constructor() {
    for (let x = 0; x < 8; x++) {
      this.board[x] = [];
      for (let y = 0; y < 8; y++) {
        const p: Piece = new Piece();
        p.type = 'empty';
        this.board[x][y] = p;
      }
    }
  }

  ngOnInit(): void {
  }

  newGame() {
    const p: Piece = new Piece();
    p.color = 'black';
    p.color = 'king';
    this.board[2][2] = p;
    this.board[5][4] = p;
  }
}
