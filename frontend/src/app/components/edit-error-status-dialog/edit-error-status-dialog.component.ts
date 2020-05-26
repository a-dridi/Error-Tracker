import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditStatusDialogData } from 'src/app/editStatusDialog.model';
import { ErrorMessageService } from 'src/app/error-message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-error-status-dialog',
  templateUrl: './edit-error-status-dialog.component.html',
  styleUrls: ['./edit-error-status-dialog.component.css']
})


export class EditErrorStatusDialogComponent implements OnInit {

  constructor(
    public editStatusDialogRef: MatDialogRef<EditErrorStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditStatusDialogData, private errorMessageService: ErrorMessageService, private snackBar: MatSnackBar) {}

 
  ngOnInit(): void {
  }

  onSubmitEdit(): void {
    this.errorMessageService.updateStatusErrorMessage(this.data.id, this.data.status).subscribe(() => {
      this.snackBar.open("OK. Status updated", "OK", {
        duration: 4000
      });
      this.editStatusDialogRef.close();
    });
  }


  onCancelEdit(): void {
    this.editStatusDialogRef.close();
  }

}

