import { Component, OnInit } from '@angular/core';
import {Musica} from "../../shared/models/Musica";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {PartituraService} from "../partitura.service";
import {AuthService} from "../../shared/auth/auth.service";

@Component({
  selector: 'app-add-partitura',
  templateUrl: './add-partitura.component.html',
  styleUrls: ['./add-partitura.component.css']
})
export class AddPartituraComponent implements OnInit {

  musica: Musica;
  nomeArquivo = '';
  titulo = '';
  nomeUsuario: string;

  constructor(
    private route: ActivatedRoute,
    private pttService: PartituraService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.musica = this.route.snapshot.data.musica;
    this.nomeUsuario = this.authService.usuarioSubj.value.nome;
    const artistas = this.musica.artistaMusicas.map(am => am.artista.nome);
    this.titulo = `${artistas.join(', ')} - ${this.musica.titulo} por ${this.nomeUsuario}`;
  }

  onSubmit(f: NgForm) {

  }

  processFile(inputFile: HTMLInputElement) {
    console.log(inputFile);
    const file: File = inputFile.files[0];

    this.nomeArquivo = file.name;

  }
}
