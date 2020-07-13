import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Usuario} from "../../shared/models/Usuario";
import {MatDialog} from "@angular/material/dialog";
import {DialogAddAdmComponent} from "./dialog-add-adm/dialog-add-adm.component";

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  private adms: Usuario[];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.adms = this.route.snapshot.data.adms;
  }

  handleAddAdm() {
    const dialogRef = this.dialog.open(DialogAddAdmComponent, {
      maxWidth: '900px',
      minHeight: '200px'
    });
    dialogRef.afterClosed().subscribe(usuario => {
      if (usuario) {
        this.adms.push(usuario);
      }
    });
  }

}
