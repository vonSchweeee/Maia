import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class ResponseInterceptorService implements HttpInterceptor {

  constructor(private snackbar: MatSnackBar, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        event => event instanceof HttpResponse ? 'succeeded' : '',
        error => {
          if (error.status === 401) {
            this.snackbar.open('Sessão expirada', 'Ok', {duration: 2500, panelClass: 'snackbar-error'});
            this.authService.logout();
          }
        })
    );
  }
}
