import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString, MaxLength } from 'class-validator';
import { Columns } from '../columns/columns.entity';
import { Users } from '../users/users.entity';
import { Comments } from '../comments/comments.entity';
import { Type } from 'class-transformer';

@Entity()
export class Cards {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @IsString({ always: true })
  @Column()
  userId: string;

  @IsString({ always: true })
  @Column()
  columnId: string;

  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  /**
   * Relations
   */

  @OneToMany(() => Comments, (comments) => comments.card)
  @Type(() => Comments)
  @JoinColumn()
  comments?: Comments[];

  @ManyToOne(() => Columns, (columns) => columns.cards, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  public column: Columns;

  @ManyToOne(() => Users, (users) => users.cards, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  public user: Users;
}
