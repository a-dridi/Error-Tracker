import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListfixedComponent } from './listfixed.component';

describe('ListfixedComponent', () => {
  let component: ListfixedComponent;
  let fixture: ComponentFixture<ListfixedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListfixedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListfixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
