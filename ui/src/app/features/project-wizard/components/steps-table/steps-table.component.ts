import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { word } from 'src/app/core/utils/words';
import { IMqStep } from 'src/app/shared/interfaces/mq-step.interface';

@Component({
  selector: 'app-steps-table',
  templateUrl: './steps-table.component.html',
  styleUrls: ['./steps-table.component.scss'],
})
export class StepsTableComponent implements OnInit {
  @Input() steps: Partial<IMqStep>[];
  @Input() isDraggable: boolean = false;

  // Grid
  @ViewChild('grid') grid: GridComponent;
  public selectOptions: Object;
  public rowDropOptions: object;

  rowDrop(args: any) {
    args.cancel = true;
    var value = [];
    for (var r = 0; r < args.rows.length; r++) {
      value.push(args.fromIndex + r);
    }
    this.grid.reorderRows(value, args.dropIndex);
  }

  public refreshGrid() {
    this.grid.refresh();
  }

  public getSteps() {
    const steps = this.grid.getRowsObject().map(({ data }, index) => ({ ...data, order: index + 1 }));
    return steps;
  }

  word = word;

  constructor() {}

  ngOnInit(): void {
    this.selectOptions = { type: 'Single' };
    this.rowDropOptions = { targetID: 'Grid' };
  }
}
