import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Tab} from "../shared/models/Tab";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  tabs: Tab[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tabs = this.route.snapshot.data.tabs;
  }

}
