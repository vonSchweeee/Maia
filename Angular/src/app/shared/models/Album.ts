import {Musica} from "./Musica";

export class Album {
  constructor(
    public titulo: string,
    public dataLanc: Date,
    public urlSpotify: string,
    public urlImagem: string,
    public musicas: Musica[],
    public artistaId?: number,
    public quantAvaliacoes?: number,
    public mediaNota?: number,
    public id?: number,
  ) { }
}
