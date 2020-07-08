import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Partitura} from "../../shared/models/Partitura";
import {Observable} from "rxjs";
import {PartituraService} from "../partitura.service";

@Injectable({
  providedIn: 'root'
})
export class PartituraResolverService implements Resolve<Partitura>{

  constructor(private service: PartituraService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Partitura> | Promise<Partitura> | Partitura {
    const id = route.params.id;
    return this.service.fetchPartituraById(id);
  }
}
