import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASEURL} from '../shared/settings/settings';
import {Musica} from '../shared/models/Musica';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {

  constructor(private http: HttpClient) { }

  fetchDetailedMusicaById(id: number) {
    return this.http.get<Musica>(BASEURL + `musicas/id/${id}?detailed=true`);
  }

  fetchMusicaWithAlbumById(id: number) {
    return this.http.get<Musica>(BASEURL + `musicas/id/${id}?detailed=false&includeAlbum=true`);
  }

  fetchMusicaById(id: number) {
    return this.http.get<Musica>(BASEURL + `musicas/id/${id}`);
  }
}
