import { Component, OnInit } from '@angular/core';
import {ImageSnippet} from "../../../shared/utils/ImageSnippet";
import {Artista} from "../../../shared/models/Artista";
import {AdminService} from "../../admin.service";
import {Musica} from "../../../shared/models/Musica";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css']
})
export class AddAlbumComponent implements OnInit {

  image: ImageSnippet;
  loading = false;
  artista = new Artista('', '');
  artistas: Artista[];
  timeoutPesquisa: any;
  resultsClosed = false;
  form: FormGroup;

  constructor(private admService: AdminService, protected formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: [null, Validators.required],
      artista: [this.artista.nome, Validators.required],
      musicas: new FormArray([])
    });

  }


  get musicasForm() {
    return this.form.get('musicas') as FormArray;
  }

  addMusica() {
    const musica = this.formBuilder.group({
      titulo: '',
      duracao: '00:00:00',
      dataLanc: new Date(),
      urlSpotify: '',
      faixa: 0
    });
    this.musicasForm.push(musica);
  }

  deleteMusica(i: number) {
    this.musicasForm.removeAt(i);
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
    if (this.artista.id) {
      const nome = this.artista.nome;
      this.artista = new Artista(nome, '');
      this.resultsClosed = false;
    }
    if (! this.artista.nome)
      return;

    clearTimeout(this.timeoutPesquisa);
    this.timeoutPesquisa = setTimeout(() => {
      this.admService.fetchArtistasByNome(this.artista.nome)
        .subscribe(res => {
          this.artistas = res;
        });
    }, 1800);
  }

  onSelectArtista(artista: Artista) {
    this.artista = artista;
    this.resultsClosed = true;
  }
}
