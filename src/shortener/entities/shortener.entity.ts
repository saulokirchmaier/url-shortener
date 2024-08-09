import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shortener {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  original_url: string;

  @Column({ type: 'varchar', length: 6, unique: true })
  shorter_url: string;

  @Column({ type: 'varchar', nullable: true })
  userId!: string;
}
