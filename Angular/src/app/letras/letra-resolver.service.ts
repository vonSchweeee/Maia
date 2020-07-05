import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Letra} from "../shared/models/Letra";
import {Observable} from "rxjs";
import {LetraService} from "./letra.service";
import {tap} from "rxjs/operators";

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
        if (! letras)
          this.router.navigate([`/letras/add/id/${route.params.id}`]);
      }));
  }

}
