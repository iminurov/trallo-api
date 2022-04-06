import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, MaxLength } from 'class-validator';
import { Users } from '../users/users.entity';
import { Cards } from '../cards/cards.entity';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @IsString({ always: true })
  @Column()
  userId: string;

  @IsString({ always: true })
  @Column()
  cardId: string;

  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @IsString({ always: true })
  @Column({ type: 'varchar', length: 1000, nullable: false })
  body: string;

  /**
   * Relations
   */

  @ManyToOne(() => Cards, (Cards) => Cards.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  public card: Cards;

  @ManyToOne(() => Users, (Users) => Users.cards, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  public user: Users;
}
