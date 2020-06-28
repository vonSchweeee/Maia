import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Artista } from '../shared/models/Artista';
import {baseUrl} from "../shared/settings/settings";
import {Album} from '../shared/models/Album';
import {Musica} from '../shared/models/Musica';

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

  public addAlbum(album: Album) {
    return this.http.post<Album>(baseUrl + "albuns", album);
  }

  fetchMusicas() {
    return this.http.get<Musica[]>(baseUrl + "musicas");
  }

  fetchAlbuns() {
    return this.http.get<Album[]>(baseUrl + "albuns");
  }
}
