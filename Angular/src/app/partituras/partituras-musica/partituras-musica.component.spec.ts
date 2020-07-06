import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiturasMusicaComponent } from './partituras-musica.component';

describe('PartiturasMusicaComponent', () => {
  let component: PartiturasMusicaComponent;
  let fixture: ComponentFixture<PartiturasMusicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartiturasMusicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartiturasMusicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
