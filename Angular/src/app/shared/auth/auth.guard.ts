import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
    boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.authService.usuarioSubj.pipe(take(1), map(usuario => {
      const isAuth = !!usuario;
      if (isAuth) {
        if (route.url[0].path === 'login') {
          return this.router.createUrlTree(['/feed']);
        }
        return isAuth;
      }
      if (route.url[0].path !== 'login') {
        return this.router.createUrlTree(['/login']);
      }
      return true;
    }));
  }
}
