import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Letra} from "../shared/models/Letra";
import {LetraService} from "./letras.service";
import {Observable} from "rxjs";
import {Musica} from "../shared/models/Musica";

@Injectable({
  providedIn: 'root'
})
export class LetrasResolverService implements Resolve<Musica[]> {

  constructor(private service: LetraService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Musica[]> | Promise<Musica[]> | Musica[] {
    return this.service.fetchLetrasByPopularity();
  }

}
