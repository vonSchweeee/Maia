import { Component, OnInit } from '@angular/core';
import {Artista} from "../../../shared/models/Artista";
import {AdminService} from "../../admin.service";

@Component({
  selector: 'app-lista-artista-management',
  templateUrl: './lista-artista-management.component.html',
  styleUrls: ['./lista-artista-management.component.css']
})
export class ListaArtistaManagementComponent implements OnInit {

  constructor(private admService: AdminService) { }

  artistas: Artista[];

  ngOnInit(): void {
    this.admService.fetchArtistas()
      .subscribe(artistas => {
        this.artistas = artistas;
        console.log(artistas);
      });
  }

}
