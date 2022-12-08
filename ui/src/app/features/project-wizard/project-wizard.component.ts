import { Component, OnInit } from '@angular/core';

import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-project-wizard',
  templateUrl: './project-wizard.component.html',
  styleUrls: ['./project-wizard.component.scss'],
})
export class ProjectWizardComponent implements OnInit {
  public projects: any[] = [];

  public fields: object = { text: 'name', id: 'projectId' };

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.onProjects().subscribe((projects) => {
      this.projects = projects;
      console.log(this.projects);
    });
    this.projectService.getProjects();
  }
}
