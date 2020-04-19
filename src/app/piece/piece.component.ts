import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Piece} from './piece';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit, AfterViewInit {

  pieceInit: Piece;
  piece: Piece;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.piece = this.pieceInit;
  }

}
