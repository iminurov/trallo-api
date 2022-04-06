import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateCommentsDto, UpdateCommentsDto } from "./comments.dto";
import { CurrentUser } from "../auth/current-user.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CommentsOwnerGuard } from "./comments.guards";
import { Users } from "../users/users.entity";
import { CardOwnerGuard, CardsOwnerGuard } from "../cards/cards.guards";

@ApiBearerAuth()
@ApiTags("comments")
@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {
  }

  @UseGuards(JwtAuthGuard, CardsOwnerGuard)
  @ApiBody({
    type: "object",
    schema: { example: { cardId: "", name: "", body: "" } }
  })
  @Post()
  create(@Body() createCommentsDto: CreateCommentsDto, @CurrentUser() user) {
    return this.commentsService.create(createCommentsDto, user);
  }

  @ApiQuery({
    name: "cardId",
    description: "The id of a card",
    required: false
  })
  @UseGuards(JwtAuthGuard, CardOwnerGuard)
  @Get()
  findAll(@CurrentUser() user: Users, @Query("cardId") cardId: string) {
    return this.commentsService.findAll(user, cardId);
  }

  @UseGuards(JwtAuthGuard, CommentsOwnerGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.commentsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, CommentsOwnerGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCommentsDto: UpdateCommentsDto
  ) {
    return this.commentsService.update(id, updateCommentsDto);
  }

  @UseGuards(JwtAuthGuard, CommentsOwnerGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.commentsService.remove(id);
  }
}
