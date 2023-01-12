import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SyncfusionModule } from './syncfusion/syncfusion.module';
import { DirectivesModule } from './directives/directives.module';
import { InputComponent } from './components/input/input.component';
import { ValidationErrorComponent } from './components/validation-error/validation-error.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { TableComponent } from './components/table/table.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

const components = [InputComponent, ValidationErrorComponent, DropdownComponent, TableComponent, ToolbarComponent];

const modules: any[] = [CommonModule, SyncfusionModule, ReactiveFormsModule, RouterModule, DirectivesModule];

@NgModule({
  declarations: [...components, TableComponent, ToolbarComponent],
  imports: [...modules],
  exports: [...components, ...modules],
})
export class SharedModule {}
