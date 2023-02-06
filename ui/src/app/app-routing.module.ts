import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutManagerComponent } from './layout-manager/layout-manager.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutManagerComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layout-manager/layout-manager.module').then((m) => m.LayoutManagerModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
