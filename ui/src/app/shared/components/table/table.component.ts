import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @ViewChild('grid') grid: GridComponent;
  @Output() onSetRecord = new EventEmitter<any>();
  @Input() data: any[];
  @Input() columns: any[];
  @Input() width: number = 500;

  refreshGrid() {
    this.grid?.refresh();
  }

  setRecord() {
    this.onSetRecord.emit(this.grid?.getSelectedRecords()[0] as Task);
  }

  clearRecord() {
    this.onSetRecord.emit(null);
  }

  constructor() {}

  ngOnInit(): void {}
}
