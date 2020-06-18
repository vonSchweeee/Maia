import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbunsManagementComponent } from './albuns-management.component';

describe('AlbumManagementComponent', () => {
  let component: AlbunsManagementComponent;
  let fixture: ComponentFixture<AlbunsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbunsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbunsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
