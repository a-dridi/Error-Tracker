import { Component, OnInit } from '@angular/core';
import { ErrorMessageService } from '../../error-message.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ErrorMessage } from '../../errormessage.model';
import { EditErrorStatusDialogComponent } from '../edit-error-status-dialog/edit-error-status-dialog.component';
import { ErrorStatuses } from 'src/app/errorstatuses.class';
import { ErrorDescriptionDialogComponent } from '../error-description-dialog/error-description-dialog.component';
import { Sort } from '@angular/material/sort';
import { CompileMetadataResolver } from '@angular/compiler';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  errorMessages: ErrorMessage[];
  sortedErrorMessages: ErrorMessage[];
  errorMessagesDataSource;

  errorMesagesSize: number = 0;
  errorFixed: boolean = false;
  errorMessageColumns = ['fix', 'date', 'application', 'title', 'description', 'status', 'edit-delete'];


  constructor(private errorMessageService: ErrorMessageService, private snackBar: MatSnackBar, private router: Router, private editDialog: MatDialog, private descriptionDialog: MatDialog) { }

  ngOnInit(): void {
    this.loadErrorMessages();
  }

  loadErrorMessages() {
    this.errorMessageService
      .getErrorMessages()
      .subscribe((data: ErrorMessage[]) => {
        this.errorMessages = data;
        this.errorMesagesSize = this.errorMessages.length;
        this.sortedErrorMessages= data;
        this.errorMessagesDataSource = new MatTableDataSource(this.sortedErrorMessages);
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

  /**
   * Display a description of an error in a dialog
   * @param date 
   * @param title 
   * @param description 
   */
  showDescription(date, title, description) {
    const showDescriptionDialogRef = this.descriptionDialog.open(ErrorDescriptionDialogComponent, {
      width: '800px',
      data: { errorDate: date, errorTitle: title, errorDescription: description }
    });
  }

  sortErrorMessages(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      this.sortedErrorMessages = this.errorMessages;
      return;
    }

    this.sortedErrorMessages = this.errorMessages.sort((a, b) => {
      const isAscending = sort.direction === 'asc';
      switch (sort.active) {
        case 'fix': return this.compareErrorMessageField(a.fixed ? 1 : 0, b.fixed ? 1 : 0, isAscending);
        case 'date': return this.compareErrorMessageField(this.getTimestampFromString(a.date), this.getTimestampFromString(b.date), isAscending);
        case 'application': return this.compareErrorMessageField(a.application, b.application, isAscending);
        case 'title': return this.compareErrorMessageField(a.title, b.title, isAscending);
        default: return 0;
      }
    });
  }

  compareErrorMessageField(a: number | string, b: number | string, isAscending: boolean) {
    return (a < b ? -1 : 1) * (isAscending ? 1 : -1);
  }

  runErrorMessageFilter(filterValue: string){
    this.errorMessagesDataSource.filter = filterValue.trim().toLowerCase();
  }


  /**
 * Returns timestamp from strings containing date time in the format "dd.MM.yyyy hh:mm". 
 * @param datetimeString String in this format for example: 02.09.2018 21:08 
 * @return timestamp if date format is correct. If not, then 0
 */
  getTimestampFromString(datetimeString: string): number {
    const parsedDateStringArray = datetimeString.split(".");
    if (parsedDateStringArray.length !== 3) {
      return 0;
    }

    const dayDate = parseInt(parsedDateStringArray[0]);
    const monthDate = parseInt(parsedDateStringArray[1]);
    const yearTimeDateStringArray = parsedDateStringArray[2].split(" ");
    if (yearTimeDateStringArray.length !== 2) {
      return 0; //Date does not contain time after date. 
    }
    const yearDate = parseInt(yearTimeDateStringArray[0]);

    const timeDateStringArray = yearTimeDateStringArray[1].split(":");
    if (timeDateStringArray.length !== 2) {
      return 0;
    }
    const hourDate = parseInt(timeDateStringArray[0]);
    const minuteDate = parseInt(timeDateStringArray[1]);
    if (isNaN(dayDate) || isNaN(monthDate) || isNaN(yearDate) || isNaN(hourDate) || isNaN(minuteDate)) {
      return 0;
    }
    return new Date(yearDate, monthDate, dayDate, hourDate, minuteDate, 0, 0).getTime();
  }


}
