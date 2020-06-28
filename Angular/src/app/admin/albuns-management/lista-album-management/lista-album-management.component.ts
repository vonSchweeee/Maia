import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../admin.service';
import {Album} from '../../../shared/models/Album';

@Component({
  selector: 'app-lista-album',
  templateUrl: './lista-album-management.component.html',
  styleUrls: ['./lista-album-management.component.css']
})
export class ListaAlbumManagementComponent implements OnInit {

  albuns: Album[] = [];

  constructor(private admService: AdminService) { }

  ngOnInit(): void {
    this.admService.fetchAlbuns().subscribe(albuns => {
      this.albuns = albuns;
    });
  }

}
