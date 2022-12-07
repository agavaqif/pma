import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskStatusPipe } from './task-status.pipe';
import { DropDownPipe } from './dropdown.pipe';

@NgModule({
  declarations: [TaskStatusPipe, DropDownPipe],
  imports: [CommonModule],
  exports: [TaskStatusPipe, DropDownPipe],
})
export class PipesModule {}
