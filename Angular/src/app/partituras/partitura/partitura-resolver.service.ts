import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Partitura} from "../../shared/models/Partitura";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PartituraResolverService implements Resolve<Partitura>{

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Partitura> | Promise<Partitura> | Partitura {
    return undefined;
  }
}
