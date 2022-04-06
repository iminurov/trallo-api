import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ColumnsModule } from "./columns/columns.module";
import { CardsModule } from "./cards/cards.module";
import { CommentsModule } from "./comments/comments.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "platform",
      password: "platform",
      database: "platform",
      synchronize: true,
      autoLoadEntities: true
    }),
    UsersModule,
    AuthModule,
    ColumnsModule,
    CardsModule,
    CommentsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
