import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { SyncfusionModule } from './syncfusion/syncfusion.module';
import { DirectivesModule } from './directives/directives.module';
import { InputComponent } from './components/input/input.component';
import { ValidationErrorComponent } from './components/validation-error/validation-error.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';

const components = [InputComponent, ValidationErrorComponent, DropdownComponent];

const modules: any[] = [CommonModule, SyncfusionModule, ReactiveFormsModule, RouterModule, DirectivesModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
})
export class SharedModule {}
