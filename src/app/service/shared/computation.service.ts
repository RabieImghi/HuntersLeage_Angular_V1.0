import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComputationService {
  private refreshComput = new Subject<void>();
  refreshComput$ = this.refreshComput.asObservable();
  triggerRefresh() {
    this.refreshComput.next();
  }
}
