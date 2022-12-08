import { errorMessage } from './../../../core/utils/words';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.scss'],
})
export class ValidationErrorComponent {
  @Input() fcn: AbstractControl | null;
  errorMessage = errorMessage;

  get singleError() {
    if (this.fcn?.errors && this.fcn?.touched) {
      const error = Object.keys(this.fcn?.errors)[0];
      return errorMessage(error);
    }
    return null;
  }
}
