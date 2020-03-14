import { Component, OnInit } from '@angular/core';
import { ErrorMessageService } from '../../error-message.service';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar'; 

import {ErrorMessage} from '../../errormessage.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  errorMessages: ErrorMessage[];
  errorMessageColumns = ['date', 'application', 'title', 'description', 'edit-delete'];

  constructor(private errorMessageService: ErrorMessageService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.loadErrorMessages();
  }

  loadErrorMessages(){
    this.errorMessageService
    .getErrorMessages()
    .subscribe((data: ErrorMessage[]) => {
      this.errorMessages = data;
      console.log("Error (ErrorMessage) data loaded");
    })
  }

  editErrorMessage(id){
    this.router.navigate([`/edit/${id}`]);
  }

  deleteErrorMessage(id){
    this.errorMessageService.deleteErrorMessage(id).subscribe(() => {
      this.loadErrorMessages();
      this.snackBar.open("Error was deleted successfully!", "OK", {
        duration: 4000
      });
    });
  }

}
