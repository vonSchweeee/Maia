import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddAdmComponent } from './dialog-add-adm.component';

describe('DialogAddAdmComponent', () => {
  let component: DialogAddAdmComponent;
  let fixture: ComponentFixture<DialogAddAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
