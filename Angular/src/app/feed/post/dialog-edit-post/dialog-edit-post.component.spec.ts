import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditPostComponent } from './dialog-edit-post.component';

describe('DialogEditComponent', () => {
  let component: DialogEditPostComponent;
  let fixture: ComponentFixture<DialogEditPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
