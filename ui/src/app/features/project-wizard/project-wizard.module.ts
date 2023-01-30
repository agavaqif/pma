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
import { KpAssignmentsComponent } from './components/kp-assignments/kp-assignments.component';
import { IsCompletedModalComponent } from './components/is-completed-modal/is-completed-modal.component';
import { MqStepsTableComponent } from './components/mq-steps-table/mq-steps-table.component';
import { SummaryComponent } from './components/summary/summary.component';

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
    KpAssignmentsComponent,
    IsCompletedModalComponent,
    MqStepsTableComponent,
    SummaryComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class ProjectWizardModule {}
