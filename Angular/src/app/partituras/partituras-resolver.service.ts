import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Partitura} from "../shared/models/Partitura";
import {Observable} from "rxjs";
import {PartituraService} from "./partitura.service";

@Injectable({
  providedIn: 'root'
})
export class PartiturasResolverService implements Resolve<Partitura[]> {

  constructor(private service: PartituraService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Partitura[]> | Promise<Partitura[]> | Partitura[] {
    return this.service.fetchPartiturasPopulares();
  }
}
