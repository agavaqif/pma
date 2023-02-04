import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { word } from 'src/app/core/utils/words';
import { IProject } from 'src/app/shared/interfaces/project.interface';
import { ProjectService } from 'src/app/core/services/project.service';
import { SummaryComponent } from './components/summary/summary.component';

@Component({
  selector: 'app-project-wizard',
  templateUrl: './project-wizard.component.html',
  styleUrls: ['./project-wizard.component.scss'],
})
export class ProjectWizardComponent implements OnInit {
  public project: IProject;
  public fields: object = { text: 'name', id: 'projectId' };

  @ViewChild(SummaryComponent)
  private summary: SummaryComponent;

  public headerText = [
    { text: word('EXEC_TYPES') },
    { text: word('KPS') },
    { text: word('MEASUREMENT_QUANTITIES') },
    { text: word('STEPS') },
    { text: word('PIPELINE_MANAGER') },
    { text: word('CREWS') },
    { text: word('KP_ASSIGNMENTS') },
    { text: word('SUMMARY') },
  ];

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {}

  get projectId() {
    return this.route.snapshot.paramMap.get('projectId');
  }

  ngOnInit(): void {
    this.projectService.getProject(this.projectId).subscribe((project: any) => (this.project = project));
  }

  onTabSelect(args: any) {
    console.log(args);
    if (args.selectedIndex == 6) {
      // Update data after first click
      if (this.summary) this.summary.initData();
    }
  }
}
