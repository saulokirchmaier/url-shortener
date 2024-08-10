import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shortener {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  original_url: string;

  @Column({ type: 'varchar', length: 6, unique: true })
  shorter_url: string;

  @Column({ type: 'integer', default: 0 })
  accesses: number;

  @Column({ type: 'integer', nullable: true })
  userId!: number;

  @Column({ type: 'date', nullable: true })
  updated_at!: Date;

  @Column({ type: 'date', nullable: true })
  deleted_at!: Date;
}
