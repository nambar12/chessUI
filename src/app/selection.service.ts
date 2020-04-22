import {Injectable} from '@angular/core';
import {Piece} from './piece/piece';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  previous: Piece = null;
  current: Piece = null;
  subject: Subject<Piece> = new Subject<Piece>();

  constructor() {
  }

  public select(p: Piece) {
    if (this.current) {
      this.current.selected = false;
    }
    this.previous = this.current;
    if (p === this.current) {
      this.current = null;
    }
    else {
      this.current = p;
      if (this.current) {
        this.current.selected = true;
      }
    }
    this.subject.next(this.current);
  }
}
