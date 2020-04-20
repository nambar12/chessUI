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
    const p1: Piece = new Piece();
    p1.color = 'black';
    p1.type = 'king';
    const p2: Piece = new Piece();
    p2.color = 'white';
    p2.type = 'king';
    const p3: Piece = new Piece();
    p3.color = 'white';
    p3.type = 'bishop';
    this.board[2][2] = p1;
    this.board[5][4] = p2;
    this.board[7][3] = p3;
  }
}
