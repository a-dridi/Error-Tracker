import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  uri = "http://localhost:4000"

  constructor(private http: HttpClient) { }

  getErrorMessages() {
    return this.http.get(`${this.uri}/errors`);
  }

  getErrorMessagesById(id) {
    return this.http.get(`${this.uri}/errors/${id}`);
  }

  addErrorMessage(date, application, title, description){
    const errormessage = {
      date: date,
      application: application,
      title: title,
      description: description
    };
    return this.http.post(`${this.uri}/errors/add`, errormessage);
  }

  updateErrorMessage(id, date, application, title, description){
    const errormessage = {
      date: date,
      application: application,
      title: title,
      description: description
    };
    return this.http.post(`${this.uri}/errors/update/${id}`, errormessage);
  }

  deleteErrorMessage(id){
    return this.http.get(`${this.uri}/errors/delete/${id}`);
  }


}


