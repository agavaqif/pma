import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface IToolbarBtn {
  text?: string;
  prefixIcon?: string;
  id?: string;
  align?: 'left' | 'right';
  disabled?: boolean | (() => boolean);
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() btns: IToolbarBtn[] = [];
  @Output() btnClick = new EventEmitter<any>();

  constructor() {}

  public onBtnClick = (id: any) => {
    this.btnClick.emit(id);
  };

  ngOnInit(): void {}
}
