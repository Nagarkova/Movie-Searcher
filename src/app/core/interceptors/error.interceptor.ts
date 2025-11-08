import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggingService } from '../services/logging.service';
import { ErrorService } from '../services/error.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private logger: LoggingService,
    private errorService: ErrorService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        this.logger.log(err);
        let message = 'Unexpected error occurred.';
        if (err.error?.message) message = err.error.message;
        if (err.status === 401 || err.status === 403) {
          message = 'You are not authorized.';
          this.router.navigate(['/login']);
        }
        this.errorService.showError(message);
        return throwError(() => err);
      })
    );
  }
}
