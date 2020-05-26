import { Component, OnInit } from '@angular/core';
import { ErrorMessageService } from 'src/app/error-message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FixedError } from '../../fixederror.model';

@Component({
  selector: 'app-listfixed',
  templateUrl: './listfixed.component.html',
  styleUrls: ['./listfixed.component.css']
})
export class ListfixedComponent implements OnInit {

  errorMessages: FixedError[];
  errorMessageColumns = ['unfix', 'fixeddate', 'application', 'title', 'description', 'errordate', 'delete'];

  constructor(private errorMessageService: ErrorMessageService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadErrorMessages();
  }

  loadErrorMessages() {
    this.errorMessageService
      .getFixedErrors()
      .subscribe((data: FixedError[]) => {
        this.errorMessages = data;
      })
  }

  /*
  editErrorMessage(id) {
    this.router.navigate([`/edit/${id}`]);
  }
  */

  deleteFixedError(id) {
    this.errorMessageService.deleteFixedError(id).subscribe(() => {
      this.loadErrorMessages();
      this.snackBar.open("Fixed Error was deleted successfully!", "OK", {
        duration: 4000
      });
    });
  }

  unfixError(id) {
    this.errorMessageService.unfixErrorMessage(id).subscribe(
      result => {
        this.snackBar.open("OK. Error was unfixed", "OK", {
          duration: 4000
        });
      },
      error => {
        this.snackBar.open("ERROR. Error cannot be fixed on this site. Please go to: Open Errors", "OK", {
          duration: 4000
        });
      });
  }


}
