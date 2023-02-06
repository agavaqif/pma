import { HomeComponent } from './../features/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectWizardComponent } from '../features/project-wizard/project-wizard.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'project-wizard/:projectId',
    loadChildren: () => import('../features/project-wizard/project-wizard.module').then((m) => m.ProjectWizardModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutManagerRoutingModule {}
