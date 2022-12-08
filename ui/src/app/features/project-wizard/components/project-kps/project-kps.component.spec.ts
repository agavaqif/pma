import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectKpsComponent } from './project-kps.component';

describe('ProjectKpsComponent', () => {
  let component: ProjectKpsComponent;
  let fixture: ComponentFixture<ProjectKpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectKpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectKpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
