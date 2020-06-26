import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPreviewAlbumComponent } from './dialog-preview-album.component';

describe('DialogPreviewComponent', () => {
  let component: DialogPreviewAlbumComponent;
  let fixture: ComponentFixture<DialogPreviewAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPreviewAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPreviewAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
