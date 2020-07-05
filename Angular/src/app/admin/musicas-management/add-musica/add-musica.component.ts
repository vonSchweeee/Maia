import { Component, OnInit } from '@angular/core';
import {ImageSnippet} from "../../../shared/utils/ImageSnippet";
import {ImageService} from "../../../shared/services/image.service";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {NgForm} from "@angular/forms";
import {AdminService} from "../../admin.service";
import {Artista} from "../../../shared/models/Artista";
import {Album} from "../../../shared/models/Album";

@Component({
  selector: 'app-add-musica',
  templateUrl: './add-musica.component.html',
  styleUrls: ['./add-musica.component.css']
})
export class AddMusicaComponent implements OnInit {

  image: ImageSnippet;
  single = true;
  loading = false;
  nomeArtista: string;
  artista = new Artista('', '');
  artistas: Artista[];
  nomeAlbum: string;
  album: Album;
  albuns: Album[];
  timeoutPesquisa: any;
  resultsArtistaClosed = false;
  resultsAlbumClosed = false;
  urlSpotify: string;
  urlYoutube: string;

  constructor(
    private imageService: ImageService,
    private admService: AdminService
  ) { }

  ngOnInit(): void {
  }

  async processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    await new Promise<string | ArrayBuffer>((resolve, reject) => {

      reader.readAsDataURL(file);

      reader.onload = e => {

        if (typeof(reader.result) === typeof('') && typeof(e.target.result) === typeof(''))
          this.image = new ImageSnippet(e.target.result as string, reader.result as string, file);
      };
      reader.onerror = error => reject(error);

    });
  }

  onArtistaTxtChange() {
    this.resultsArtistaClosed = false;

    if (! this.nomeArtista) {
      this.resultsArtistaClosed = true;
      return;
    }

    if (this.artista.id && this.nomeArtista !== this.artista.nome) {
      this.resultsArtistaClosed = false;
    }
    if (this.artista.nome === this.nomeArtista)
      return;


    clearTimeout(this.timeoutPesquisa);
    this.timeoutPesquisa = setTimeout(() => {
      this.admService.fetchArtistasByNome(this.nomeArtista)
        .subscribe(res => {
          this.artistas = res;
        });
    }, 1000);
  }

  onAlbumTxtChange() {
    this.resultsAlbumClosed = false;

    if (! this.nomeAlbum) {
      this.resultsAlbumClosed = true;
      return;
    }

    if (this.album) {
      if (this.album.id && this.nomeAlbum !== this.album.titulo) {
        this.resultsAlbumClosed = false;
      }
      if (this.album.titulo === this.nomeAlbum)
        return;
    }


    clearTimeout(this.timeoutPesquisa);
    this.timeoutPesquisa = setTimeout(() => {
      this.admService.fetchAlbunsByNome(this.nomeAlbum)
        .subscribe(res => {
          console.log(res);
          this.albuns = res;
        });
    }, 1000);
  }

  onSelectArtista(artista: Artista) {
    this.artista = artista;
    this.nomeArtista = artista.nome;
    this.resultsArtistaClosed = true;
  }

  onSelectAlbum(album: Album) {
    this.album = album;
    this.nomeAlbum = album.titulo;
    this.artista = album.artista;
    this.nomeArtista = album.artista.nome;
    this.resultsAlbumClosed = true;
  }

  onSingleCheck($event: MatCheckboxChange) {
    this.single = $event.checked;
  }

  onSubmit(f: NgForm) {

  }
}
