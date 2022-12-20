import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineManagerComponent } from './pipeline-manager.component';

describe('PipelineManagerComponent', () => {
  let component: PipelineManagerComponent;
  let fixture: ComponentFixture<PipelineManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
