import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Letra} from "../shared/models/Letra";
import {Musica} from "../shared/models/Musica";

@Component({
  selector: 'app-letras',
  templateUrl: './letras.component.html',
  styleUrls: ['./letras.component.css']
})
export class LetrasComponent implements OnInit {

  musicas: Musica[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const musicas = this.route.snapshot.data.musicas;
    this.musicas = this.getUnique(musicas, musicas);
  }

  getUnique(arr, comp) {

    // Metódo provisório (gambiarra), caso esse sistema seja continuado algum dia por favor arrume
    // alguma forma melhor de não mostrar a mesma música 2 vezes

    const unique =  arr.map(e => e[comp])

      // store the indexes of the unique objects
      .map((e, i, final) => final.indexOf(e) !== i && i)

      // eliminate the false indexes & return unique objects
      .filter((e) => arr[e]).map(e => arr[e]);

    return unique;
  }

}
