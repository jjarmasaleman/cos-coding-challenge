import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { NotificationService } from '@controls/notification';
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BaseService {
  private notificationService: NotificationService;
  private http: HttpClient;

  constructor(private injector: Injector) {
    // Retrieve the dependencies manually from the injector service
    this.http = this.injector.get(HttpClient);
    this.notificationService = this.injector.get(NotificationService);
  }

  public delete<T>(url: string, fallback?: T): Observable<T> {
    return this.http.delete<T>(environment.baseUrl + url).pipe(catchError(this.handleError(fallback)));
  }

  public get<T>(url: string, fallback?: T): Observable<T> {
    return this.http.get<T>(environment.baseUrl + url).pipe(catchError(this.handleError(fallback)));
  }

  public patch<T>(url: string, body: unknown, fallback?: T): Observable<T> {
    return this.http.patch<T>(environment.baseUrl + url, body).pipe(catchError(this.handleError(fallback)));
  }

  public post<T>(url: string, body: unknown, fallback?: T): Observable<T> {
    return this.http.post<T>(environment.baseUrl + url, body).pipe(catchError(this.handleError(fallback)));
  }

  public put<T>(url: string, body: unknown, fallback?: T): Observable<T> {
    return this.http.put<T>(environment.baseUrl + url, body).pipe(catchError(this.handleError(fallback)));
  }

  private handleError<T>(fallback?: T) {
    // Errors are handled here from a business logic perspective
    return (error: HttpErrorResponse): Observable<T> => {
      switch (error.status) {
        case 401:
          this.notificationService.showNotification('Invalid email or password');
          break;
        case 500:
          this.notificationService.showNotification('Internal server error', 3000);
          break;
        default:
          this.notificationService.showNotification(error.message, 3000);
          break;
      }

      // Let the app keep running by returning a safe result
      if (fallback) {
        return of(fallback);
      } else {
        return of();
      }
    };
  }
}
