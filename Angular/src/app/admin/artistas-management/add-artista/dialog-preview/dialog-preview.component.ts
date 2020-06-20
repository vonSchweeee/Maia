import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Artista } from '../../../../shared/models/Artista';

@Component({
  selector: 'app-dialog-preview',
  templateUrl: './dialog-preview.component.html',
  styleUrls: ['./dialog-preview.component.css']
})
export class DialogPreviewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public artista: Artista
    ) { }

  ngOnInit(): void {
  }

  onConfirm() {
    this.dialogRef.close();
  }

}
