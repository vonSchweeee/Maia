import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlbumManagementComponent } from './lista-album-management.component';

describe('ListaAlbumComponent', () => {
  let component: ListaAlbumManagementComponent;
  let fixture: ComponentFixture<ListaAlbumManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAlbumManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAlbumManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
