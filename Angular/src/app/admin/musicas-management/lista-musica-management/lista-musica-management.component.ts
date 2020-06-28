import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../admin.service';
import {Musica} from '../../../shared/models/Musica';

@Component({
  selector: 'app-lista-musica',
  templateUrl: './lista-musica.component.html',
  styleUrls: ['./lista-musica-management.component.css']
})
export class ListaMusicaManagementComponent implements OnInit {

  musicas: Musica[] = [];

  constructor(private admService: AdminService) { }

  ngOnInit() {
    this.admService.fetchMusicas().subscribe(musicas => {
      this.musicas = musicas;
    });
  }

}
