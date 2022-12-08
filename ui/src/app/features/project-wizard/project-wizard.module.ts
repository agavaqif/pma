import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectWizardComponent } from './project-wizard.component';

@NgModule({
  declarations: [ProjectWizardComponent],
  imports: [CommonModule, SharedModule],
})
export class ProjectWizardModule {}
