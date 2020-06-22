import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Artista } from '../shared/models/Artista';
import {baseUrl} from "../shared/settings/settings";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public addArtista(artista: Artista) {
    return this.http.post<Artista>(baseUrl + "artistas", artista);
  }

  public fetchArtistas() {
    return this.http.get<Artista[]>(baseUrl + "artistas");
  }

  public fetchArtistasByNome(nome: string) {
    return this.http.get<Artista[]>(`${baseUrl}artistas?nome=${nome}`);
  }

}
