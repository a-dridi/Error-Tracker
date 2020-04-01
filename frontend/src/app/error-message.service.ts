import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  uri = "api"

  constructor(private http: HttpClient) { }

  getErrorMessages() {
    return this.http.get(`${this.uri}/errors`);
  }

  getErrorMessagesById(id) {
    return this.http.get(`${this.uri}/errors/${id}`);
  }

  addErrorMessage(date, application, title, description, status){
    const errormessage = {
      date: date,
      application: application,
      title: title,
      description: description,
      status: status
    };
    return this.http.post(`${this.uri}/errors/add`, errormessage);
  }

  updateErrorMessage(id, date, application, title, description, status){
    const errormessage = {
      date: date,
      application: application,
      title: title,
      description: description,
      status: status
    };
    return this.http.post(`${this.uri}/errors/update/${id}`, errormessage);
  }

  updateStatusErrorMessage(id, status){
    const errorstatus = {
      status: status
    }
    return this.http.post(`${this.uri}/errors/updatestatus/${id}`, errorstatus);
  }

  deleteErrorMessage(id){
    return this.http.get(`${this.uri}/errors/delete/${id}`);
  }

  /**
   * Change status to fixed and remove error from errormessage table and add it to the fixederror table
   * @param id 
   */
  errorMessageFixed(id){
    return this.http.get(`${this.uri}/errors/fixed/${id}`);
  }

  getFixedErrors(){
    return this.http.get(`${this.uri}/fixederrors`);
  }

   /**
   * Change status to unfixed and remove error from fixederror table and add it to the errormessage table
   * @param id 
   */
  unfixErrorMessage(id){
    return this.http.get(`${this.uri}/fixederror/unfix/${id}`);
  }

  deleteFixedError(id){
    return this.http.get(`${this.uri}/fixederror/delete/${id}`);
  }


}


