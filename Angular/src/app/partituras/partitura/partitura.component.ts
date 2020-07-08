import { Component, OnInit } from '@angular/core';
import {Partitura} from "../../shared/models/Partitura";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";

@Component({
  selector: 'app-partitura',
  templateUrl: './partitura.component.html',
  styleUrls: ['./partitura.component.css']
})
export class PartituraComponent implements OnInit {

  partitura: Partitura;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.partitura = this.route.snapshot.data.partitura;
    console.log(this.partitura);
  }

}
