import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectWizardComponent } from './project-wizard.component';
import { ProjectKpsComponent } from './components/project-kps/project-kps.component';
import { ProjectExecTypesComponent } from './components/project-exec-types/project-exec-types.component';
import { ProjectMqsComponent } from './components/project-mqs/project-mqs.component';
import { BatchUpdateKpsComponent } from './components/batch-update-kps/batch-update-kps.component';
import { PipelineManagerComponent } from './components/pipeline-manager/pipeline-manager.component';
import { ProjectCrewsComponent } from './components/project-crews/project-crews.component';
import { AddStepsComponent } from './components/add-steps/add-steps.component';
import { StepsTableComponent } from './components/steps-table/steps-table.component';

@NgModule({
  declarations: [
    ProjectWizardComponent,
    ProjectKpsComponent,
    ProjectExecTypesComponent,
    ProjectMqsComponent,
    BatchUpdateKpsComponent,
    PipelineManagerComponent,
    ProjectCrewsComponent,
    AddStepsComponent,
    StepsTableComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class ProjectWizardModule {}
