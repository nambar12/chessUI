import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Piece} from '../piece/piece';
import {PieceDTO} from '../DTO/pieceDTO';
import {SelectionService} from '../selection.service';
import {SquareComponent} from '../square/square.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board: object[][] = [[]];
  squares: SquareComponent[][] = [[]];

  constructor(private http: HttpClient,
              private selection: SelectionService) {
  }

  ngOnInit(): void {
    this.selection.subject.subscribe(() => this.selectionChanged());
    for (let x = 0; x < 8; x++) {
      this.board[x] = [];
      this.squares[x] = new Array(8);
      for (let y = 0; y < 8; y++) {
        const p: Piece = new Piece();
        p.type = 'empty';
        this.board[x][y] = p;
      }
    }
  }

  newGame() {
    this.readBoard();
  }

  readBoard() {
    this.http.get('http://localhost:8080/board').subscribe(pieces => {
      for (const pieceDTO of pieces as Array<PieceDTO>) {
        const piece: Piece = new Piece();
        piece.type = pieceDTO.name;
        piece.color = pieceDTO.color.toLowerCase();
        this.board[pieceDTO.square.y][pieceDTO.square.x] = piece;
      }
    });
  }

  selectionChanged() {
    if (this.selection.current && this.selection.previous) {
      this.selection.current.type = this.selection.previous.type;
      this.selection.current.color = this.selection.previous.color;
      this.selection.previous.type = 'empty';
      this.selection.select(null);
    }
  }
}
