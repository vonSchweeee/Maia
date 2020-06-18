import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistasManagementComponent } from './artistas-management.component';

describe('ArtistasManagementComponent', () => {
  let component: ArtistasManagementComponent;
  let fixture: ComponentFixture<ArtistasManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistasManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistasManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
