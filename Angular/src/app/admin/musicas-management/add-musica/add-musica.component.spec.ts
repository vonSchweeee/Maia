import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMusicaComponent } from './add-musica.component';

describe('AddMusicaComponent', () => {
  let component: AddMusicaComponent;
  let fixture: ComponentFixture<AddMusicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMusicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMusicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
