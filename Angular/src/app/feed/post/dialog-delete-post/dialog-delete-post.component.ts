import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Post} from "../../post.model";
@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeletePostComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDeletePostComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { post: Post }) { }

  ngOnInit(): void {
  }

  onDismiss() {
    this.dialogRef.close();
  }

}
