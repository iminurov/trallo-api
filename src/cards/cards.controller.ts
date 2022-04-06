import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateCardsDto, UpdateCardsDto } from './cards.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CardsOwnerGuard } from './cards.guards';
import { CurrentUser } from '../auth/current-user.decorator';
import { Users } from '../users/users.entity';
import { ColumnOwnerGuard, ColumnsOwnerGuard } from '../columns/columns.guards';

@ApiBearerAuth()
@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @UseGuards(JwtAuthGuard, ColumnsOwnerGuard)
  @Post()
  @ApiBody({ type: 'object', schema: { example: { name: '', columnId: '' } } })
  create(@Body() createCardsDto: CreateCardsDto, @CurrentUser() user: Users) {
    return this.cardsService.create(createCardsDto, user);
  }

  @ApiQuery({
    name: 'columnId',
    description: 'The id of a column',
    required: false,
  })
  @UseGuards(JwtAuthGuard, ColumnOwnerGuard)
  @Get()
  findAll(@CurrentUser() user: Users, @Query('columnId') columnId: string) {
    return this.cardsService.findAll(user, columnId);
  }

  @UseGuards(JwtAuthGuard, CardsOwnerGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, CardsOwnerGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardsDto: UpdateCardsDto) {
    return this.cardsService.update(id, updateCardsDto);
  }

  @UseGuards(JwtAuthGuard, CardsOwnerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(id);
  }
}
