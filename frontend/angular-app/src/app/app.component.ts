import {Component} from '@angular/core';
import {ConfigService} from "./core/services/state/config-service/config.service";
import {RestApiConfig} from "./core/configs/rest-api.config";
import {AuthenticationService} from "./core/services/api/authentication-service/authentication.service";
import { catchError, map, Observable, of } from "rxjs";
import { AppUser } from "./core/interfaces/user.interface";
import { NavService } from "./core/services/state/nav-service/nav.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly title = "Locations";

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthenticationService,
    private readonly navService: NavService,
  ) {
    // const srcList = [0, 1, 1, 2];
    // const listToExecute$ = of(...srcList);
    // interval(2000)
    //   .pipe(map((index) => srcList[index]), tap((val) => console.log(val))).subscribe();
    // listToExecute$.pipe(
    //   tap((val) => console.log(`Input stream ${val}`)),
    //   concatMap(value => interval(2000)),
    //   tap((val) => console.log(`Output stream ${val}`)))
    //   .subscribe();
    // let closureInt = 0;
    // zip(interval(1000), of(1, 2, 3, 4), from(Promise.reject()))
    //   .pipe(
    //     catchError((err) => {return of([])})
    //   )
    //   .subscribe((list) => console.log(list));
    // interval(7000).pipe(
    //   tap((val) => console.log(`Input stream ${val}`)),
    //   combineLatestWith(listToExecute$.pipe(concatMap((value) => of(value).pipe(delay(8000))))),
    //   //throttleTime(4000),
    //   //auditTime(3500),
    //   // concatMap(() => listToExecute$.pipe(first())),
    //   //distinctUntilChanged(),
    //   //mergeMap(() => interval(3000).pipe(take(4))),
    //   tap((val) => console.log(`Output stream ${val}`))
    // ).subscribe((value) => console.log(`Subscriber sees ${value}`));
    // interval(2000)
    //   .pipe(concatMap((index) => delay[index]), tap((val) => console.log(val))).subscribe();
    //listToExecute$.pipe(timer(0, 2000), tap((val) => console.log(val))).subscribe(() => {});
  }

  getNavItems$(): Observable<RestApiConfig[]> {
    return this.navService.getAllNavItems$()
      .pipe(
        map(mapOfNav => Array.from(mapOfNav, ([k, v]) => v)));
  }

  getUsername$(): Observable<AppUser> {
    return this.authService.getCurrentUser$();
  }
}
