import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Musica} from "../../shared/models/Musica";
import {Observable} from "rxjs";
import {MusicaService} from "../../musica/musica.service";

@Injectable({
  providedIn: 'root'
})
export class AddPartituraResolverService implements Resolve<Musica>{

  constructor(
    private mscService: MusicaService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Musica> | Promise<Musica> | Musica {
    const id = route.params.id;
    return this.mscService.fetchDetailedMusicaById(id);
  }
}
