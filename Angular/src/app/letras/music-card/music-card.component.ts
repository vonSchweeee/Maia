import {Component, Input, OnInit} from '@angular/core';
import {Musica} from "../../shared/models/Musica";

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.css']
})
export class MusicCardComponent implements OnInit {

  @Input() musica: Musica;

  constructor() { }

  ngOnInit(): void {
  }

}
