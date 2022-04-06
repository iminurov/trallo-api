import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { classToPlain, Exclude, Type } from 'class-transformer';
import { Columns } from '../columns/columns.entity';
import { Cards } from '../cards/cards.entity';
import { Comments } from '../comments/comments.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @OneToMany(() => Columns, (columns) => columns.user)
  @Type(() => Columns)
  @JoinColumn()
  columns?: Columns[];

  @OneToMany(() => Cards, (cards) => cards.user)
  @Type(() => Cards)
  @JoinColumn()
  cards?: Cards[];

  @OneToMany(() => Comments, (comments) => comments.user)
  @Type(() => Comments)
  @JoinColumn()
  comments?: Comments[];

  toJSON() {
    return classToPlain(this);
  }
}
