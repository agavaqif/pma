import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchUpdateKpsComponent } from './batch-update-kps.component';

describe('BatchUpdateKpsComponent', () => {
  let component: BatchUpdateKpsComponent;
  let fixture: ComponentFixture<BatchUpdateKpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchUpdateKpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchUpdateKpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
