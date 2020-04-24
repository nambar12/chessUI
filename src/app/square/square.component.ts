import {
  Component, ViewChild, ViewContainerRef, ComponentFactoryResolver,
  OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output
} from '@angular/core';
import {PieceComponent} from '../piece/piece.component';
import {Piece} from '../piece/piece';
import {SelectionService} from '../selection.service';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit, OnChanges {

  componentRef: any;
  @Input() piece: Piece;
  @Input() x: number;
  @Input() y: number;
  @Output() selectedPieceChange = new EventEmitter<Piece>();
  @ViewChild('pieceContainer', {read: ViewContainerRef}) entry: ViewContainerRef;
  highlight: boolean;

  constructor(private resolver: ComponentFactoryResolver,
              private selection: SelectionService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      if (this.piece.type !== 'empty') {
        this.createComponent();
      }
    });
  }

  createComponent() {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(PieceComponent);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.templateUrl = '../piece/templates/Chess_pdt45.svg';
    this.componentRef.instance.piece = this.piece;
  }

  hasPiece(): boolean {
    return this.piece.type !== 'empty';
  }

  selected() {
    if (this.selection.current) {
      if (this.selection.current !== this.piece) {
        if (this.moveAllowed()) {
          this.move();
        }
        return;
      }
    }
    if (!this.componentRef) {
      return;
    }
    const p = this.componentRef.instance.piece;
    this.selection.x = this.x;
    this.selection.y = this.y;
    this.selection.select(p);
  }

  private move() {
    console.log(`move (${this.selection.x},${this.selection.y}) -> (${this.x},${this.y})`);
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.piece.type = this.selection.current.type;
    this.piece.color = this.selection.current.color;
    this.selection.current.type = 'empty';
    this.createComponent();
    this.selection.select(null);
  }

  private moveAllowed() {
    return true;
  }

  setHighlight(shouldHighlight: boolean) {
    if (shouldHighlight) {
      if (this.selection.current) {
        this.highlight = true;
      }
    }
    else {
      this.highlight = false;
    }
  }
}
