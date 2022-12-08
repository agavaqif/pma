import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Input() data: any;
  @Input() fg: FormGroup;
  @Input() fn: string;
  @Input() label: string;
  @Input() fields = { value: 'value', text: 'text' };

  public onFiltering(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate(this.fields.text, 'contains', e.text, true);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = e.text != '' ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.data, query);
  }

  get fcn() {
    return this.fg.get(this.fn);
  }
}
