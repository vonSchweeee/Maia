import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsMusicaComponent } from './tabs-musica.component';

describe('TabsMusicaComponent', () => {
  let component: TabsMusicaComponent;
  let fixture: ComponentFixture<TabsMusicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsMusicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsMusicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
