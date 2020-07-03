import { Component, OnInit } from '@angular/core';
import {Musica} from '../shared/models/Musica';
import {MusicaService} from './musica.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  styleUrls: ['./musica.component.css']
})
export class MusicaComponent implements OnInit {

  musica: Musica;
  urlSpotify: SafeResourceUrl;
  biografia: string;

  constructor(private mscService: MusicaService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.musica = history.state && history.state.musica;
    if (this.musica)
      this.fetchMusica(this.musica.id);
    else {
      const id = this.route.snapshot.params.id;
      this.fetchMusica(id);
    }
  }

  private async fetchMusica(id: number) {
    try {
      this.mscService.fetchDetailedMusicaById(id).subscribe(res => {
        this.musica = res;
        this.urlSpotify = this.sanitizer.bypassSecurityTrustResourceUrl(this.musica.urlSpotify);
        this.biografia = this.musica.artistaMusicas[0].artista.biografia.replace(/\n/g, '<br><br>');
      });
    }
    catch (e) {
      console.log(e);
    }
  }

}
