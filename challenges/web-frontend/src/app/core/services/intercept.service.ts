import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { storage } from '@globals/storage';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class InterceptService implements HttpInterceptor {
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const auth = localStorage.getItem(storage.authKey);
    let userId = '';
    let token = '';

    if (auth) {
      const parsedAuth = JSON.parse(auth);

      userId = parsedAuth.userId;
      token = parsedAuth.token;
    }

    request = request.clone({
      setHeaders: {
        userid: `${userId}`,
        authtoken: `${token}`,
      },
    });

    // Let the app continue to run by returning an observable that is
    // identical to the original, even in the event of an error
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            console.debug(event);
          }
        },
        (error) => {
          // All errors coming from the service or derived from the connection are handled here
          console.error(error.status);
          console.error(error.message);

          if (error.error) {
            console.error(error.error.message);
          }
        }
      )
    );
  }
}
