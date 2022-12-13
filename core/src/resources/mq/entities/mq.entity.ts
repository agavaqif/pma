import { MqUnit } from 'src/shared/enums/mq-unit.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'measurable_quantity' })
export class Mq {
  @PrimaryGeneratedColumn({ name: 'mq_id' })
  mqId: number;

  @Column()
  name: string;

  @Column({ name: 'is_balanced', type: 'boolean', default: false })
  isBalanced: boolean;

  @Column({ name: 'unit_of_measure', type: 'enum', enum: MqUnit })
  unitOfMeasure: MqUnit;
}
