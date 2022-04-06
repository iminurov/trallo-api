import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnsDto, UpdateColumnsDto } from './columns.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ColumnOwnerGuard, ColumnsOwnerGuard } from './columns.guards';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { Users } from '../users/users.entity';

@ApiBearerAuth()
@ApiTags('columns')
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: 'object', schema: { example: { name: '' } } })
  @Post()
  create(
    @Body() createColumnDto: CreateColumnsDto,
    @CurrentUser() user: Users,
  ) {
    return this.columnsService.create(createColumnDto, user);
  }

  @UseGuards(JwtAuthGuard, ColumnOwnerGuard)
  @Get()
  findAll(@CurrentUser() user: Users) {
    return this.columnsService.findAll(user);
  }

  @UseGuards(JwtAuthGuard, ColumnsOwnerGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.columnsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, ColumnsOwnerGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnsDto) {
    return this.columnsService.update(id, updateColumnDto);
  }

  @UseGuards(JwtAuthGuard, ColumnsOwnerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnsService.remove(id);
  }
}
