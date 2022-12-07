import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from 'src/app/shared/enums/task-status.enum';

@Pipe({
  name: 'taskStatusPipe',
  pure: true,
})
export class TaskStatusPipe implements PipeTransform {
  transform(status: TaskStatus, args?: any): any {
    switch (status) {
      case TaskStatus.PLANNED:
        return 'Planned';
      case TaskStatus.STARTED:
        return 'On Going';
      case TaskStatus.INREVIEW:
        return 'In Review';
      case TaskStatus.COMPLETED:
        return 'Completed';
      default:
        return 'Planned';
    }
  }
}
