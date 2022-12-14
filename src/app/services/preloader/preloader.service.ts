import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PreloaderService {
  public isLoading = new Subject<boolean>();
  
  constructor() { }

  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }
}
