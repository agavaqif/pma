import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

import { ExecTypesService } from 'src/app/core/services/exec-types.service';
import { word } from 'src/app/core/utils/words';
import { ProjectService } from 'src/app/core/services/project.service';
import { KpService } from 'src/app/core/services/kp.service';

@Component({
  selector: 'app-batch-update-kps',
  templateUrl: './batch-update-kps.component.html',
  styleUrls: ['./batch-update-kps.component.scss'],
})
export class BatchUpdateKpsComponent implements OnInit {
  execTypes: any[];
  public start = 0;
  public end = 100;
  public accuracy = 0;

  // Modal
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  @ViewChild('container', { read: ElementRef, static: false }) container: ElementRef;
  public targetEl: HTMLElement;
  public btns: object[];
  public initTarget = () => (this.targetEl = this.container?.nativeElement?.parentElement);
  public initBtns() {
    this.btns = [
      { click: this.onSubmit.bind(this), buttonModel: { content: word('UPDATE'), isPrimary: true } },
      { click: this.closeModal.bind(this), buttonModel: { content: 'Cancel' } },
    ];
  }

  public openModal(): void {
    this.initForm();
    this.ejDialog?.show();
  }

  public closeModal(): void {
    this.kpsForm.reset();
    this.ejDialog?.hide();
  }

  // Forms
  public kpsForm: FormGroup;
  public initForm() {
    this.kpsForm = new FormGroup({
      execType: new FormControl('', [Validators.required]),
      kps: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.kpsForm.valid) {
      console.log(this.kpsForm.value);
      const body = {
        execTypeId: this.kpsForm.value.execType,
        ranges: this.kpsForm.value.kps.split(',').map((kp: string) => {
          const [start, end] = kp.split('-');
          return {
            ...(end ? { start: +start, end: +end } : { start: +start - this.accuracy, end: +start }),
          };
        }),
      };
      this.kpService.batchUpdateKps(this.projectId, body).subscribe(() => this.kpService.getKpsByProjectId(this.projectId));
      this.closeModal();
    } else {
      this.kpsForm.markAllAsTouched();
    }
  }

  init() {
    this.projectService.getProjectSettings(this.projectId).subscribe(({ start, end, accuracy }) => {
      this.start = start;
      this.end = end;
    });
  }

  get projectId() {
    return +this.route.snapshot.paramMap.get('projectId');
  }

  word = word;

  constructor(private route: ActivatedRoute, private execTypesService: ExecTypesService, private projectService: ProjectService, private kpService: KpService) {}

  ngOnInit(): void {
    this.execTypesService.onExecTypes().subscribe((execTypes) => (this.execTypes = execTypes.map((execType) => ({ value: execType.execTypeId, text: execType.name }))));
    this.execTypesService.getExecTypesByProjectId(this.projectId);
    this.initTarget();
    this.initForm();
    this.initBtns();
    this.projectService.getProjectSettings(this.projectId).subscribe(({ start, end, accuracy }) => {
      this.start = +start;
      this.end = +end;
      this.accuracy = +accuracy;
    });
  }
}
