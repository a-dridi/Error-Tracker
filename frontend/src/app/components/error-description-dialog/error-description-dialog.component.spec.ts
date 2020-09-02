import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDescriptionDialogComponent } from './error-description-dialog.component';

describe('ErrorDescriptionDialogComponent', () => {
  let component: ErrorDescriptionDialogComponent;
  let fixture: ComponentFixture<ErrorDescriptionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorDescriptionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
