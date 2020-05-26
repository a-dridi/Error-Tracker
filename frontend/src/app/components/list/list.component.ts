import { Component, OnInit } from '@angular/core';
import { ErrorMessageService } from '../../error-message.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ErrorMessage } from '../../errormessage.model';
import { EditErrorStatusDialogComponent } from '../edit-error-status-dialog/edit-error-status-dialog.component';
import { ErrorStatuses } from 'src/app/errorstatuses.class';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  errorMessages: ErrorMessage[];
  errorFixed: boolean = false;
  errorMessageColumns = ['fix', 'date', 'application', 'title', 'description', 'status', 'edit-delete'];

  constructor(private errorMessageService: ErrorMessageService, private snackBar: MatSnackBar, private router: Router, private editDialog: MatDialog) { }

  ngOnInit(): void {
    this.loadErrorMessages();
  }

  loadErrorMessages() {
    this.errorMessageService
      .getErrorMessages()
      .subscribe((data: ErrorMessage[]) => {
        this.errorMessages = data;
        console.log("Error (ErrorMessage) data loaded");
      })
  }

  editErrorMessage(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteErrorMessage(id) {
    this.errorMessageService.deleteErrorMessage(id).subscribe(() => {
      this.loadErrorMessages();
      this.snackBar.open("Error was deleted successfully!", "OK", {
        duration: 4000
      });
    });
  }

  fixError(id) {
    this.errorMessageService.errorMessageFixed(id).subscribe(
      result => {
        this.snackBar.open("OK. Error was fixed", "OK", {
          duration: 4000
        });
      },
      error => {
        this.snackBar.open("ERROR. Error cannot be unfixed on this site. Please go to: Fixed Errors", "OK", {
          duration: 4000
        });
      }
    );
  }

  /**
   * Change status of an error (id) through a dialog
   * @param id 
   * @param status status of the Error that will be edit 
   */
  changeErrorStatus(id, status) {
    const editStatusDialogRef = this.editDialog.open(EditErrorStatusDialogComponent, {
      width: '300px',
      data: { id: id, status: status, statusList: ErrorStatuses.statusArray }
    });
    
    editStatusDialogRef.afterClosed().subscribe(result => {
      this.loadErrorMessages();
    });

  }

}
