import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BaseService {
  private http: HttpClient;

  constructor(private injector: Injector) {
    // Retrieve the dependencies manually from the injector service
    this.http = this.injector.get(HttpClient);
  }

  public delete<T>(url: string, fallback?: T): Observable<T> {
    return this.http.delete<T>(url).pipe(catchError(this.handleError(fallback)));
  }

  public get<T>(url: string, fallback?: T): Observable<T> {
    return this.http.get<T>(url).pipe(catchError(this.handleError(fallback)));
  }

  public patch<T>(url: string, body: unknown, fallback?: T): Observable<T> {
    return this.http.patch<T>(url, body).pipe(catchError(this.handleError(fallback)));
  }

  public post<T>(url: string, body: unknown, fallback?: T): Observable<T> {
    return this.http.post<T>(url, body).pipe(catchError(this.handleError(fallback)));
  }

  public put<T>(url: string, body: unknown, fallback?: T): Observable<T> {
    return this.http.put<T>(url, body).pipe(catchError(this.handleError(fallback)));
  }

  private handleError<T>(fallback?: T) {
    // Errors are handled here from a business logic perspective
    return (error: unknown): Observable<T> => {
      console.error(error);

      // Let the app keep running by returning a safe result
      if (fallback) {
        return of(fallback);
      } else {
        return of();
      }
    };
  }
}
