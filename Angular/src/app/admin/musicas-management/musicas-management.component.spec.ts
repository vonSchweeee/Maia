import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicasManagementComponent } from './musicas-management.component';

describe('MusicasComponent', () => {
  let component: MusicasManagementComponent;
  let fixture: ComponentFixture<MusicasManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicasManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicasManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
