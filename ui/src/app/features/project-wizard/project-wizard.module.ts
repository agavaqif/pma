import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectWizardComponent } from './project-wizard.component';
import { ProjectKpsComponent } from './components/project-kps/project-kps.component';
import { ProjectExecTypesComponent } from './components/project-exec-types/project-exec-types.component';
import { ProjectMqsComponent } from './components/project-mqs/project-mqs.component';
import { BatchUpdateKpsComponent } from './components/batch-update-kps/batch-update-kps.component';
import { PipelineManagerComponent } from './components/pipeline-manager/pipeline-manager.component';

@NgModule({
  declarations: [ProjectWizardComponent, ProjectKpsComponent, ProjectExecTypesComponent, ProjectMqsComponent, BatchUpdateKpsComponent, PipelineManagerComponent],
  imports: [CommonModule, SharedModule],
})
export class ProjectWizardModule {}
