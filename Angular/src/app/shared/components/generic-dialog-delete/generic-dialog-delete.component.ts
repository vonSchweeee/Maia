import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-generic-dialog-delete',
  templateUrl: './generic-dialog-delete.component.html',
  styleUrls: ['./generic-dialog-delete.component.css']
})
export class GenericDialogDeleteComponent implements OnInit {
  /**
   * Dialog genérico para exclusão
   *
   * @param data - Uma string para ser exibida
   * @returns True caso confirmado, undefined caso cancelado
   *
   */

  constructor(public dialogRef: MatDialogRef<GenericDialogDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

  onDismiss() {
    this.dialogRef.close();
  }

}
