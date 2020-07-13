import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Partitura} from "../shared/models/Partitura";

@Component({
  selector: 'app-partituras',
  templateUrl: './partituras.component.html',
  styleUrls: ['./partituras.component.css']
})
export class PartiturasComponent implements OnInit {

  partituras: Partitura[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.partituras = this.route.snapshot.data.partituras;
  }

}
