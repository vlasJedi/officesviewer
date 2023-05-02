import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {BackdropService} from "../../../core/services/backdrop-service/backdrop.service";

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss']
})
export class BackdropComponent {
  isVisible$: Observable<boolean> = new Observable<boolean>();

  constructor(private readonly backdropService: BackdropService) {
    // this is just ref to observable
    this.isVisible$ = backdropService.getBackdropActive$() || this.isVisible$;
  }
}
