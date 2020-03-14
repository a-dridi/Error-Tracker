import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessageService } from 'src/app/error-message.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  selectedHour: string;
  selectedMinute: string;
  @Input() value: string;

  constructor(private errorMessageService: ErrorMessageService, private errorMessageForm: FormBuilder, private router: Router) {
    this.createForm = this.errorMessageForm.group({
      date: [''],
      application: [''],
      title: ['', Validators.required],
      description: ['']
    });
    this.value="12:40";
  }

  ngOnInit(): void {
  }

  addErrorMessage(date, application, title, description) {
    //Reformat date into us format - for given French date locale
    let dateParsed = new Date(date.split("/").reverse().join("/"));
    //Set selected time by timepicker
    if (!isNaN(parseInt(this.selectedHour)) && !isNaN(parseInt(this.selectedHour))) {
      dateParsed.setHours(parseInt(this.selectedHour));
      dateParsed.setMinutes(parseInt(this.selectedMinute));
    }
    date = dateParsed.toString();
    this.errorMessageService.addErrorMessage(date, application, title, description).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  updateTime(time: String) {
    let timeSplitted = time.split(":");
    this.selectedHour = timeSplitted[0];
    this.selectedMinute = timeSplitted[1];
  }

}
