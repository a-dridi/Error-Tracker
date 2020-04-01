import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditErrorStatusDialogComponent } from './edit-error-status-dialog.component';

describe('EditErrorStatusDialogComponent', () => {
  let component: EditErrorStatusDialogComponent;
  let fixture: ComponentFixture<EditErrorStatusDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditErrorStatusDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditErrorStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
