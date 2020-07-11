import { Injectable } from '@angular/core';
import {Musica} from "../../shared/models/Musica";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {MusicaService} from "../../musica/musica.service";

@Injectable({
  providedIn: 'root'
})
export class MusicaEditResolverService implements Resolve<Musica>{

  constructor(private service: MusicaService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Musica> | Promise<Musica> | Musica {
    const id = route.params.id;
    return this.service.fetchDetailedMusicaById(id);
  }
}
