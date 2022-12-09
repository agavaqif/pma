import { KpUnit } from 'src/shared/enums/kp-unit.enum';
import { Column } from 'typeorm';

export class ProjectSettings {
  @Column({ name: 'kp_unit', type: 'enum', enum: KpUnit })
  kpUnit: KpUnit;

  @Column()
  accuracy: number;
}
