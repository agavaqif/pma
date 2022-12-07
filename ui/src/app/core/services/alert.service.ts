import { Injectable } from '@angular/core';
import { ToastUtility } from '@syncfusion/ej2-angular-notifications';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  public showToast(msg: string): void {
    // ToastUtility.show('Please read the comments carefully', 'Error', 20000);
    ToastUtility.show({
      title: '',
      content: msg,
      timeOut: 20000,
      position: { X: 'Center', Y: 'Top' },
      showCloseButton: true,
      cssClass: 'e-toast-danger',
    });
  }

  public showSuccessToast(msg: string): void {
    ToastUtility.show({
      title: '',
      content: msg,
      timeOut: 20000,
      position: { X: 'Center', Y: 'Top' },
      showCloseButton: true,
      cssClass: 'e-toast-success',
    });
  }
}
