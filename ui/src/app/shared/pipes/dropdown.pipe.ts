import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from 'src/app/shared/enums/task-status.enum';

/**
 * Pipe to render text value of dropdown. Those are in {id:number, text:stirng} type of data
 */
@Pipe({
  name: 'dropdownPipe',
  pure: true,
})
export class DropDownPipe implements PipeTransform {
  transform(id: number, arr: any): any {
    let data = arr.filter((item: any) => item.id == id)[0];
    return data == undefined ? '' : data.text;
  }
}
