import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMqsComponent } from './project-mqs.component';

describe('ProjectMqsComponent', () => {
  let component: ProjectMqsComponent;
  let fixture: ComponentFixture<ProjectMqsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectMqsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
