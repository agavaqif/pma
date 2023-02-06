import { SummaryComponent } from './components/summary/summary.component';
import { KpAssignmentsComponent } from './components/kp-assignments/kp-assignments.component';
import { PipelineManagerComponent } from './components/pipeline-manager/pipeline-manager.component';
import { ProjectExecTypesComponent } from './components/project-exec-types/project-exec-types.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectWizardComponent } from './project-wizard.component';
import { ProjectKpsComponent } from './components/project-kps/project-kps.component';
import { ProjectMqsComponent } from './components/project-mqs/project-mqs.component';
import { ProjectCrewsComponent } from './components/project-crews/project-crews.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectWizardComponent,
    children: [
      {
        path: 'execution-type',
        component: ProjectExecTypesComponent,
      },
      {
        path: 'kp',
        component: ProjectKpsComponent,
      },
      {
        path: 'mq',
        component: ProjectMqsComponent,
      },
      {
        path: 'pipeline-manager',
        component: PipelineManagerComponent,
      },
      {
        path: 'crew',
        component: ProjectCrewsComponent,
      },
      {
        path: 'kp-assignment',
        component: KpAssignmentsComponent,
      },
      {
        path: 'summary',
        component: SummaryComponent,
      },
      {
        path: '',
        redirectTo: 'execution-type',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectWizardRoutingModule {}
