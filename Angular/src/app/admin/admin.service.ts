import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Artista } from '../shared/models/Artista';
import {BASEURL} from "../shared/settings/settings";
import {Album} from '../shared/models/Album';
import {Musica} from '../shared/models/Musica';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public addArtista(artista: Artista) {
    return this.http.post<Artista>(BASEURL + "artistas", artista);
  }

  public fetchArtistas() {
    return this.http.get<Artista[]>(BASEURL + "artistas");
  }

  public fetchArtistasByNome(nome: string) {
    return this.http.get<Artista[]>(`${BASEURL}artistas?nome=${nome}`);
  }

  public addAlbum(album: Album) {
    return this.http.post<Album>(BASEURL + "albuns", album);
  }

  fetchMusicas() {
    return this.http.get<Musica[]>(BASEURL + "musicas");
  }

  fetchAlbuns() {
    return this.http.get<Album[]>(BASEURL + "albuns");
  }

  fetchMusicasByNome(pesquisa: string) {
    return this.http.get<Musica[]>(`${BASEURL}musicas?nome=${pesquisa}`);
  }

  fetchAlbunsByNome(pesquisa: string) {
    return this.http.get<Album[]>(`${BASEURL}albuns?nome=${pesquisa}`);
  }
}
