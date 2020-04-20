import {
  Component, ViewChild, ViewContainerRef, ComponentFactoryResolver,
  ComponentRef, ComponentFactory, OnInit, AfterViewInit, Input, OnChanges, SimpleChanges
} from '@angular/core';
import {PieceComponent} from '../piece/piece.component';
import {Piece} from '../piece/piece';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit, OnChanges {

  componentRef: any;
  @Input() piece: Piece;
  @ViewChild('pieceContainer', {read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {
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

  destroyComponent() {
    this.componentRef.destroy();
  }
}
