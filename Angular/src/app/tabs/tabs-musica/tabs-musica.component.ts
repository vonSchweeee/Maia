import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Tab} from "../../shared/models/Tab";

@Component({
  selector: 'app-tabs-musica',
  templateUrl: './tabs-musica.component.html',
  styleUrls: ['./tabs-musica.component.css']
})
export class TabsMusicaComponent implements OnInit {

  tabs: Tab[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tabs = this.route.snapshot.data.tabs;
    console.log(this.tabs);
  }

}
