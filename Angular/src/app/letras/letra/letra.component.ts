import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Letra} from "../../shared/models/Letra";

@Component({
  selector: 'app-letra',
  templateUrl: './letra.component.html',
  styleUrls: ['./letra.component.css']
})
export class LetraComponent implements OnInit {

  letras: Letra[];
  letraOriginal: Letra;
  letraTraduzida: Letra;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.letras = this.route.snapshot.data.letra;
    this.letras.forEach(letra => {
      if (letra.idioma === 'PT-BR')
        this.letraTraduzida = letra;
      else 
        this.letraOriginal = letra;
    });
  }

}
