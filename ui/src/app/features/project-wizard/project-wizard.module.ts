import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectWizardComponent } from './project-wizard.component';
import { ProjectKpsComponent } from './components/project-kps/project-kps.component';
import { ProjectExecTypesComponent } from './components/project-exec-types/project-exec-types.component';
import { ProjectMqsComponent } from './components/project-mqs/project-mqs.component';

@NgModule({
  declarations: [ProjectWizardComponent, ProjectKpsComponent, ProjectExecTypesComponent, ProjectMqsComponent],
  imports: [CommonModule, SharedModule],
})
export class ProjectWizardModule {}
