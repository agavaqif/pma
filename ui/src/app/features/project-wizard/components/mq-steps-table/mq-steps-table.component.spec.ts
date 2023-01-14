import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MqStepsTableComponent } from './mq-steps-table.component';

describe('MqStepsTableComponent', () => {
  let component: MqStepsTableComponent;
  let fixture: ComponentFixture<MqStepsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MqStepsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MqStepsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
