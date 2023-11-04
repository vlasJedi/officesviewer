import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackdropService {
  private static readonly NOT_INTERACT = "not-interactive";
  private isBackdropActive = false;
  private readonly eventEmitter = new BehaviorSubject<boolean>(this.isBackdropActive);
  private readonly backdropActive$ = this.eventEmitter.asObservable();

  constructor() { }

  activateBackdrop() {
    this.updateBackdrop(true);
  }

  disableBackdrop() {
    this.updateBackdrop(false);
  }

  getIsBackdropActive(): boolean {
    return this.isBackdropActive;
  }

  getBackdropActive$(): Observable<boolean> {
    return this.backdropActive$;
  }

  private updateBackdrop(isActive: boolean): void {
    this.isBackdropActive = isActive;
    this.eventEmitter.next(this.isBackdropActive);
  }
}
