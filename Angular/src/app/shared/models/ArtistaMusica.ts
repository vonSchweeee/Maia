import {Artista} from './Artista';
import {Musica} from './Musica';

export class ArtistaMusica {

  artistaId: number;
  artista: Artista;

  musicaId: number;
  musica: Musica;

  constructor(artistaId?: number, artista?: Artista, musicaId?: number, musica?: Musica) {
    this.artistaId = artistaId;
    this.artista = artista;
    this.musicaId = musicaId;
    this.musica = musica;
  }
}
