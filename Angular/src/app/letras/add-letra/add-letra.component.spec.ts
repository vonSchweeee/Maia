import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLetraComponent } from './add-letra.component';

describe('AddLetraComponent', () => {
  let component: AddLetraComponent;
  let fixture: ComponentFixture<AddLetraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLetraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLetraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
