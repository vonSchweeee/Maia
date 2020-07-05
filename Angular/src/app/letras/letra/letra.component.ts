import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Letra} from "../../shared/models/Letra";
import {Musica} from "../../shared/models/Musica";

@Component({
  selector: 'app-letra',
  templateUrl: './letra.component.html',
  styleUrls: ['./letra.component.css']
})
export class LetraComponent implements OnInit {

  letras: Letra[];
  letraOriginal: Letra;
  letraTraduzida: Letra;
  musica: Musica;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.letras = this.route.snapshot.data.letras;
    this.letras.forEach(letra => {
      if (letra.idioma === 'PT-BR')
        this.letraTraduzida = letra;
      else
        this.letraOriginal = letra;

      if (! this.musica && letra.musica) {
        this.musica = letra.musica;
      }

    });
  }

}
