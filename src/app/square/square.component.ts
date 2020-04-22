import {
  Component, ViewChild, ViewContainerRef, ComponentFactoryResolver,
  ComponentRef, ComponentFactory, OnInit, AfterViewInit, Input, OnChanges, SimpleChanges, EventEmitter, Output
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
  @Output() selectedPieceChange = new EventEmitter<Piece>();
  @ViewChild('pieceContainer', {read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver,
              private selection: SelectionService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      if (this.piece.type !== 'empty') {
        this.createComponent('A');
      }
    });
  }

  createComponent(type: string) {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(PieceComponent);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.templateUrl = '../piece/templates/Chess_pdt45.svg';
    this.componentRef.instance.piece = this.piece;
  }

  hasPiece(): boolean {
    return this.piece.type !== 'empty';
  }


  destroyComponent() {
    this.componentRef.destroy();
  }

  selected() {
    if (!this.componentRef) {
      return;
    }
    const p = this.componentRef.instance.piece;
    this.selection.select(p);
  }
}
