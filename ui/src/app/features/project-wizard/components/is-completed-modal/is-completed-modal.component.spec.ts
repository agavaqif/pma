import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsCompletedModalComponent } from './is-completed-modal.component';

describe('IsCompletedModalComponent', () => {
  let component: IsCompletedModalComponent;
  let fixture: ComponentFixture<IsCompletedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsCompletedModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsCompletedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
