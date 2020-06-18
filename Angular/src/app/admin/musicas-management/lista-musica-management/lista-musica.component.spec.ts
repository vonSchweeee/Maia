import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMusicaManagementComponent } from './lista-musica-management.component';

describe('ListaMusicaComponent', () => {
  let component: ListaMusicaManagementComponent;
  let fixture: ComponentFixture<ListaMusicaManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaMusicaManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMusicaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
