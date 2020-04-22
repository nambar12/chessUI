import {Component, OnInit} from '@angular/core';
import {Piece} from './piece';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {

  piece: Piece;
  hover: boolean;

  constructor() { }

  ngOnInit(): void {
    this.hover = false;
  }

  mouseEnter() {
    if(!this.piece?.selected) {
      this.hover = true;
    }
  }

  mouseLeave() {
    this.hover = false;
  }
}
