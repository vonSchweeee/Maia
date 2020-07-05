import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Musica} from "../../shared/models/Musica";
import {Observable} from "rxjs";
import {MusicaService} from "../../musica/musica.service";
import {LetraService} from "../letras.service";
import {tap} from "rxjs/operators";

export type response = {
  idiomas: string[];
  musica: Musica;
  completo: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class AddLetraResolverService implements Resolve<response>{

  constructor(private letraService: LetraService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<response> | Promise<response> | response {
    const id = route.params.id;
    return this.letraService.resolveAddLetra(id);

    // TODO: Retornar para uma página de 404 caso não seja encontrada a música
  }
}
