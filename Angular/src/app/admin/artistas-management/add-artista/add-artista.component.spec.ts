import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArtistaComponent } from './add-artista.component';

describe('AddArtistaComponent', () => {
  let component: AddArtistaComponent;
  let fixture: ComponentFixture<AddArtistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArtistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArtistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
