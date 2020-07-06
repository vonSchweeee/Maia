import { Injectable } from '@angular/core';
import {Musica} from "../shared/models/Musica";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {MusicaService} from "../musica/musica.service";

@Injectable({
  providedIn: 'root'
})
export class SearchMusicaResolverService implements Resolve<Musica[]> {

  constructor(private service: MusicaService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Musica[]> | Promise<Musica[]> | Musica[] {
    const pesquisa = route.queryParams.nome;
    return this.service.fetchMusicasByNome(pesquisa);
  }
}
