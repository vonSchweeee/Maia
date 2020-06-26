import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {Album} from "../../../../shared/models/Album";

@Component({
  selector: 'app-dialog-preview',
  templateUrl: './dialog-preview-album.component.html',
  styleUrls: ['./dialog-preview-album.component.css']
})
export class DialogPreviewAlbumComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogPreviewAlbumComponent>,
    @Inject(MAT_DIALOG_DATA) public album: Album
    ) { }

  ngOnInit(): void {
  }

  onConfirm() {
    this.dialogRef.close();
  }

}
