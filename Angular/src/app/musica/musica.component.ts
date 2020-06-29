import { Component, OnInit } from '@angular/core';
import {Musica} from '../shared/models/Musica';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  styleUrls: ['./musica.component.css']
})
export class MusicaComponent implements OnInit {

  musica: Musica;

  constructor() {}

  ngOnInit(): void {
    this.musica = history.state && history.state.musica;
    if (! this.musica) {
      this.musica = JSON.parse('{"id":1,"titulo":"Warsaw","single":false,"faixa":1,"duracao":"00:02:26","urlImagem":"https://firebasestorage.googleapis.com/v0/b/maia-music.appspot.com/o/img%2Fan%20ideal%20for%20living.jpg?alt=media&token=4b252641-bcde-4e8c-a37c-782143114924","dataLanc":"2020-06-22T01:05:35.082","urlSpotify":"https://open.spotify.com/embed/track/58vvxoXqQicDlUFJHfOuEs","mediaNota":0,"quantAvaliacoes":0,"albumId":1}');
      console.log(this.musica);
    }
  }

}
