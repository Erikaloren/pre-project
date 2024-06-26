import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBookModalComponent } from './info-book-modal.component';

describe('InfoBookModalComponent', () => {
  let component: InfoBookModalComponent;
  let fixture: ComponentFixture<InfoBookModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoBookModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
