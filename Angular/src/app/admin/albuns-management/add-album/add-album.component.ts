import { Component, OnInit } from '@angular/core';
import {ImageSnippet} from "../../../shared/utils/ImageSnippet";
import {Artista} from "../../../shared/models/Artista";
import {AdminService} from "../../admin.service";

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

  constructor(private admService: AdminService) { }


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
    clearTimeout(this.timeoutPesquisa);
    this.timeoutPesquisa = setTimeout(() => {
      this.admService.fetchArtistasByNome(this.artista.nome)
        .subscribe(res => {
          console.log(res);
        });
    }, 1800);
  }
}
