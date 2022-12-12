import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectExecTypesComponent } from './project-exec-types.component';

describe('ProjectExecTypesComponent', () => {
  let component: ProjectExecTypesComponent;
  let fixture: ComponentFixture<ProjectExecTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectExecTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectExecTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
