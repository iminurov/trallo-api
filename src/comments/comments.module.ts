import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './comments.entity';
import { CardsModule } from '../cards/cards.module';
import { UsersModule } from '../users/users.module';
import { Users } from '../users/users.entity';
import { Cards } from '../cards/cards.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comments, Users, Cards]),
    CardsModule,
    UsersModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
