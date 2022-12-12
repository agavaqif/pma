import { IProject } from './../../shared/interfaces/project.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-project-wizard',
  templateUrl: './project-wizard.component.html',
  styleUrls: ['./project-wizard.component.scss'],
})
export class ProjectWizardComponent implements OnInit {
  public project: IProject;
  public fields: object = { text: 'name', id: 'projectId' };
  public headerText = [{ text: 'Tab 1' }, { text: 'Tab 2' }, { text: 'Tab 3' }];

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {}

  get projectId() {
    return this.route.snapshot.paramMap.get('projectId');
  }

  ngOnInit(): void {
    this.projectService.getProject(this.projectId).subscribe((project: any) => (this.project = project));
  }
}
