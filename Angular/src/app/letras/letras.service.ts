import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Letra} from "../shared/models/Letra";
import {BASEURL} from "../shared/settings/settings";
import {Observable} from "rxjs";
import {Musica} from "../shared/models/Musica";
import {response} from "./add-letra/add-letra-resolver.service";

@Injectable({
  providedIn: 'root'
})
export class LetraService {

  constructor(private http: HttpClient) { }

  public fetchLetrasByMusicaId(musicaId: number): Observable<Letra[]> {
    return this.http.get<Letra[]>(`${BASEURL}letras?musicaId=${musicaId}`);
  }

  addLetra(letra: Letra) {
    return this.http.post<Letra>(BASEURL + 'letras', letra);
  }

  resolveAddLetra(musicaId: number) {
    return this.http.get<response>(BASEURL + 'letras/check?musicaId=' + musicaId);
  }

  // Retorna apenas as informações da música
  fetchLetrasByPopularity(): Observable<Musica[]> {
    return this.http.get<Musica[]>(`${BASEURL}` + 'letras/popular');
  }
}
