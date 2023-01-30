import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { word } from 'src/app/core/utils/words';

export interface IBtn {
  click: Function;
  text: string;
  isPrimary?: boolean;
  cssClass?: string;
  disabled?: boolean | Function;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() header: string = word('MODAL_TITLE');
  @Input() width: number = 400;
  @Input() btns: IBtn[] = [
    {
      click: this.close.bind(this),
      text: word('SAVE'),
      isPrimary: true,
      cssClass: 'e-outline',
    },
    {
      click: this.close.bind(this),
      text: word('CANCEL'),
      cssClass: 'e-outline',
    },
  ];

  // Modal
  @ViewChild('ejDialog') ejDialog: DialogComponent;

  open() {
    this.ejDialog?.show();
  }

  close(): void {
    this.ejDialog?.hide();
  }

  constructor() {}

  word = word;

  ngOnInit(): void {}
}
