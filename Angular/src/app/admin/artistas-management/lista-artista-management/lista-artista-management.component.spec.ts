import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaArtistaManagementComponent } from './lista-artista-management.component';

describe('ListaArtistaManagementComponent', () => {
  let component: ListaArtistaManagementComponent;
  let fixture: ComponentFixture<ListaArtistaManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaArtistaManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaArtistaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
