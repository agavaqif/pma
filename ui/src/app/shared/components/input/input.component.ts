import { word } from './../../../core/utils/words';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  reactForm: FormGroup;
  @Input() fn: string;
  @Input() label: string;
  @Input() type: string = 'text';
  @Input() fg: FormGroup;
  @Input() readonly: boolean = false;

  // @Input() mt = false;
  @Input() mb = true;

  word = word;

  get fcn() {
    return this.fg.get(this.fn);
  }
}
