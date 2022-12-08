import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-project-wizard',
  templateUrl: './project-wizard.component.html',
  styleUrls: ['./project-wizard.component.scss'],
})
export class ProjectWizardComponent implements OnInit {
  public project: any;
  public fields: object = { text: 'name', id: 'projectId' };

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {}

  get projectId() {
    return this.route.snapshot.paramMap.get('projectId');
  }

  ngOnInit(): void {
    this.projectService.getProject(this.projectId).subscribe((project) => (this.project = project));
  }
}
