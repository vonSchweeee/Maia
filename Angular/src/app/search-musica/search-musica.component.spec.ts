import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMusicaComponent } from './search-musica.component';

describe('SearchMusicaComponent', () => {
  let component: SearchMusicaComponent;
  let fixture: ComponentFixture<SearchMusicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMusicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMusicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
