import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Musica} from "../../shared/models/Musica";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddPartituraResolverService implements Resolve<Musica>{

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Musica> | Promise<Musica> | Musica {
    return undefined;
  }
}
