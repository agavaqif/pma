import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectWizardComponent } from './project-wizard.component';
import { ProjectKpsComponent } from './components/project-kps/project-kps.component';

@NgModule({
  declarations: [ProjectWizardComponent, ProjectKpsComponent],
  imports: [CommonModule, SharedModule],
})
export class ProjectWizardModule {}
