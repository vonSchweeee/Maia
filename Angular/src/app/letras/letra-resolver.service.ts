import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Letra} from "../shared/models/Letra";
import {Observable, throwError} from "rxjs";
import {LetraService} from "./letra.service";
import {catchError, tap} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LetraResolverService implements Resolve<Letra[]> {

  constructor(
    private router: Router,
    private letraService: LetraService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Letra[]> | Promise<Letra[]> | Letra[] {
    return this.letraService.fetchLetras(route.params.id)
      .pipe(tap(letras => {
        console.log(letras);
        if (! letras || ! letras.length)
          this.router.navigate([`/letras/add/id/${route.params.id}`]);
      }), catchError(erro => this.handleError(erro, route)));
  }

  private handleError(error: HttpErrorResponse, route: ActivatedRouteSnapshot) {
    this.router.navigate([`/letras/add/id/${route.params.id}`]);
    return throwError(error);
  }

}
