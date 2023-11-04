import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

// SHOULD BE REMOVED AS SPRING ALREADY DOES REDIRECT TO LOGIN PAGE

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
          catchError((err) => {
            if (err.status === 401) {
              console.log("Caught that not authenticated");
            }
            return of(new HttpResponse({status: 401}))
          })
      );
  }
}
