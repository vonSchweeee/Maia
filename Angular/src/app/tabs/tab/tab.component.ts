import { Component, OnInit } from '@angular/core';
import {Tab} from "../../shared/models/Tab";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  tab: Tab;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tab = this.route.snapshot.data.tab;
  }

}
