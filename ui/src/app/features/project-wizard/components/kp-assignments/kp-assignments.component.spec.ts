import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpAssignmentsComponent } from './kp-assignments.component';

describe('KpAssignmentsComponent', () => {
  let component: KpAssignmentsComponent;
  let fixture: ComponentFixture<KpAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpAssignmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KpAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
