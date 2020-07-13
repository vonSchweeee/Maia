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
    this.musicas = this.getUnique(musicas);
  }

  getUnique(musicas: Musica[]) {
    // Método provisório para previnir duplicações

    const idsPresentes: number[] = [];

    return musicas.filter(musica => {
      if (idsPresentes.indexOf(musica.id) === -1) {
        idsPresentes.push(musica.id);
        return musica;
      }
    });
  }

}
