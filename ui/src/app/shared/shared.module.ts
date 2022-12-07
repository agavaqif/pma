import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SyncfusionModule } from './syncfusion/syncfusion.module';
import { PipesModule } from './pipes/pipes.module';
import { DirectivesModule } from './directives/directives.module';
import { RouterModule } from '@angular/router';

const components: any[] = [];

const modules: any[] = [CommonModule, PipesModule, SyncfusionModule, ReactiveFormsModule, RouterModule, DirectivesModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
})
export class SharedModule {}
