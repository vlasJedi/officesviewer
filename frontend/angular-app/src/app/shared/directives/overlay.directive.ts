import {Directive} from '@angular/core';
import {BackdropService} from "../../core/services/backdrop-service/backdrop.service";
@Directive({
  selector: '[appOverlay]',
  host: {
    '(mousewheel)': 'onMouseWheel($event)',
    '(DOMMouseScroll)': 'onMouseWheel($event)',
    '(keyup)': 'onKey($event)',
    '(keydown)': 'onKey($event)',
    '(touchmove)': 'onTouchMove($event)',
  }

})
export class OverlayDirective {
  private isBackDropVisible = false;
  constructor(private readonly backdropService: BackdropService) {
    backdropService.getBackdropActive$().subscribe((isVisible) => {
      this.isBackDropVisible = isVisible;
    });
  }
  getStyle() {
    return {
      "not-interactive": !this.isBackDropVisible
    };
  }

  onMouseWheel(event: Event) {
    if (!this.isBackDropVisible) event.preventDefault();
  }

  onKey(event: KeyboardEvent) {
    if ((event.code === "ArrowUp" || event.code === "ArrowDown") && !this.isBackDropVisible) event.preventDefault();
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isBackDropVisible) event.preventDefault();
  }
}
