import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.usuarioSubj.pipe(take(1), exhaustMap(usuario => {
      if (! usuario) {
        return next.handle(req);
      }
      const modifiedRequest = req.clone({headers: new HttpHeaders().append('Authorization', 'Bearer ' + usuario.token)});
      return next.handle(modifiedRequest);
    }));
  }

}
