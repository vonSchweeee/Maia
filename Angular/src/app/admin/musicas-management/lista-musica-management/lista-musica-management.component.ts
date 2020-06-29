import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../admin.service';
import {Musica} from '../../../shared/models/Musica';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lista-musica',
  templateUrl: './lista-musica.component.html',
  styleUrls: ['./lista-musica-management.component.css']
})
export class ListaMusicaManagementComponent implements OnInit {

  musicas: Musica[] = [];

  constructor(private admService: AdminService, private router: Router) { }

  ngOnInit() {
    this.admService.fetchMusicas().subscribe(musicas => {
      this.musicas = musicas;
    });
  }

  onMusicaClick(musica: Musica) {
    this.router.navigate([`/musica/${musica.id}`], {state: {musica} });
  }
}
