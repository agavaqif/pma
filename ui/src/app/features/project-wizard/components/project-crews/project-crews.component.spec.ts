import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCrewsComponent } from './project-crews.component';

describe('ProjectCrewsComponent', () => {
  let component: ProjectCrewsComponent;
  let fixture: ComponentFixture<ProjectCrewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCrewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCrewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
