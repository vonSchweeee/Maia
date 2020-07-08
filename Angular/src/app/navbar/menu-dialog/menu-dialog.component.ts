import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.css']
})
export class MenuDialogComponent implements OnInit {
  admin: boolean;

  constructor(public dialogRef: MatDialogRef<MenuDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { admin: boolean }) { }

  ngOnInit(): void {
    this.admin = this.data.admin;
  }

  onDismiss() {
    this.dialogRef.close();
  }
}
