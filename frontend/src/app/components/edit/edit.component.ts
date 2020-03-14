import { Component, OnInit, Input } from '@angular/core';
import { ErrorMessageService } from '../../error-message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  selectedHour: string;
  selectedMinute: string;
  errormessage: any = {};
  updateForm: FormGroup;
  selectedTime: string;

  constructor(private errorMessageService: ErrorMessageService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private errorMessageForm: FormBuilder) { 
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.errorMessageService.getErrorMessagesById(this.id).subscribe(res => {
        this.errormessage = res;
        let datestr = new Date(this.errormessage.date);
        this.updateForm.get("date").setValue(this.errormessage.date);
        this.selectedTime = "" + datestr.getHours() + ":" + datestr.getMinutes();
        this.updateForm.get("application").setValue(this.errormessage.application);
        this.updateForm.get("title").setValue(this.errormessage.title);
        this.updateForm.get("description").setValue(this.errormessage.description);
      })
    })
  }

  buildForm(){
    this.updateForm = this.errorMessageForm.group({
      date: [''],
      application: [''],
      title: ['', Validators.required],
      description: ['']
    });
  }

  updateErrorMessage(date, application, title, description){
    //Reformat date into us format - for given French date locale
    let dateParsed=new Date( date.split("/").reverse().join("/") );
    //Set selected time by timepicker
    if (!isNaN(parseInt(this.selectedHour)) && !isNaN(parseInt(this.selectedHour))) {
    dateParsed.setHours(parseInt(this.selectedHour));
    dateParsed.setMinutes(parseInt(this.selectedMinute));
    }
    date=dateParsed.toString();

    this.errorMessageService.updateErrorMessage(this.id, date, application, title, description).subscribe(() => {
      this.snackBar.open("Error was updated successfully!", "OK", {
        duration: 4000
      });
      })
  }

  updateTime(time: String){
    let timeSplitted = time.split(":");
    this.selectedHour = timeSplitted[0];
    this.selectedMinute = timeSplitted[1];
  }


}
