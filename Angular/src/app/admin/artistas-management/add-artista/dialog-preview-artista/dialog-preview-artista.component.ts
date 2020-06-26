import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Artista } from '../../../../shared/models/Artista';

@Component({
  selector: 'app-dialog-preview',
  templateUrl: './dialog-preview-artista.component.html',
  styleUrls: ['./dialog-preview-artista.component.css']
})
export class DialogPreviewArtistaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogPreviewArtistaComponent>,
    @Inject(MAT_DIALOG_DATA) public artista: Artista
    ) { }

  ngOnInit(): void {
  }

  onConfirm() {
    this.dialogRef.close();
  }

}
