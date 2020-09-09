import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { ErrorMessageService } from 'src/app/error-message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { ListfixedComponent } from '../listfixed/listfixed.component';
import { EditComponent } from '../edit/edit.component';
import { HttpClient } from '@angular/common/http';

describe('ListComponent', () => {
  let component: ListComponent;
  let componentFixture: ComponentFixture<ListComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const appRoutes: Routes = [
    { path: "create", component: CreateComponent },
    { path: 'edit/:id', component: EditComponent },
    { path: 'list', component: ListComponent },
    { path: 'allfixederrors', component: ListfixedComponent },
    { path: '', redirectTo: 'list', pathMatch: 'full' }
  ];

  beforeEach( async () => {
    TestBed.configureTestingModule({
      providers: [ErrorMessageService, { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }],
      imports: [HttpClientTestingModule, MatSnackBarModule, RouterModule.forRoot(appRoutes), MatDialogModule]
    });
  });

  beforeEach(() => {
   // httpClient = TestBed.get(HttpClient);
   // httpTestingController = TestBed.get(HttpTestingController);
    componentFixture = TestBed.createComponent(ListComponent);
    component = componentFixture.componentInstance;
  })

  it('parsed date "02.09.2020 21:08" should have the correct timestamp', () => {
    expect(component.getTimestampFromString("02.09.2020 21:08")).toBe(new Date(2020, 9, 2, 21, 8, 0, 0).getTime());
  });

});

