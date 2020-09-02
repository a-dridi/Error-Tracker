import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorDescriptionDialogData } from 'src/app/errorDescriptionDialog.model';

@Component({
  selector: 'app-error-description-dialog',
  templateUrl: './error-description-dialog.component.html',
  styleUrls: ['./error-description-dialog.component.css']
})
export class ErrorDescriptionDialogComponent implements OnInit {

  constructor(
    public errorDescriptionDialogRef: MatDialogRef<ErrorDescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ErrorDescriptionDialogData) {}


  ngOnInit(): void {
  }


  onClose(): void {
    this.errorDescriptionDialogRef.close();
  }


}
