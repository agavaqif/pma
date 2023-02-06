import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { word } from 'src/app/core/utils/words';
import { ExecTypesService } from 'src/app/core/services/exec-types.service';
import { MqService } from 'src/app/core/services/mq.service';
import { IMq } from 'src/app/shared/interfaces/mq.interface';

@Component({
  selector: 'app-pipeline-manager',
  templateUrl: './pipeline-manager.component.html',
  styleUrls: ['./pipeline-manager.component.scss'],
})
export class PipelineManagerComponent implements OnInit {
  public rowsData: any[] = [];
  public mqs: IMq[] = [];

  constructor(private readonly execTypeService: ExecTypesService, private route: ActivatedRoute, private readonly mqService: MqService) {}

  get projectId() {
    return +this.route.parent.snapshot.paramMap.get('projectId');
  }
  word = word;

  toggleConnection(execTypeId: number, mqId: number, connected: boolean) {
    this.execTypeService.toggleMq(this.projectId, execTypeId, mqId, connected).subscribe(() => {
      this.mqService.getAllMqs(this.projectId);
    });
  }

  getRowData() {
    this.execTypeService.onExecTypes().subscribe((execTypes) => {
      this.rowsData = execTypes.map(({ mqs, ...rest }) => {
        const connectedMqs = mqs.map((mq: any) => mq.name);
        return {
          ...rest,
          ...connectedMqs.reduce((acc, mq) => ({ ...acc, [mq]: 'yes' }), {}),
        };
      });
    });
  }

  getMqs() {
    this.mqService.onMqs().subscribe((mqs) => {
      this.mqs = mqs.filter((mq) => mq.isBalanced);
      this.execTypeService.getExecTypesByProjectId(this.projectId);
    });
  }

  ngOnInit(): void {
    this.getRowData();
    this.getMqs();
    this.mqService.getAllMqs(this.projectId);
  }
}
