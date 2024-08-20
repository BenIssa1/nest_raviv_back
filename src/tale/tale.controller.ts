import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TaleService } from './tale.service';
import { RegisterTaleDto } from './dto/registerTale.dto';
import { Request } from 'express';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { AuthGuard } from '@nestjs/passport';
import { UpdateTaleDto } from './dto/updateTale.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tale')
@Controller('tale')
export class TaleController {
  constructor(
    private readonly taleService: TaleService
  ) { }

  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  getAllDemand() {
    return this.taleService.getAll();
  }

  @Roles(['Storyteller'])
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @Post("register") 
  registerTale(
    @Body() registerTaleDto: RegisterTaleDto,
    @Req() request: Request,
  ) { 
    const userId = request.user['id'];
    return this.taleService.registerTale(registerTaleDto, userId);
  }

  @Roles(['Storyteller'])
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) taleId: number,
    @Body() updateTaleDto: UpdateTaleDto,
  ) {
    return this.taleService.update(taleId, updateTaleDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('single/:id')
  getSingle(@Param('id', ParseIntPipe) taleId: number) {
    return this.taleService.getSingle(taleId);
  }

  @Roles(['Storyteller'])
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) taleId: number) {
    return this.taleService.delete(taleId);
  }
}


