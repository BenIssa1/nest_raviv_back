import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { StorytellerService } from './storyteller.service';
import { RegisterStorytellerDto } from './dto/registerStoryteller.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Storyteller')
@Controller('storyteller')
export class StorytellerController {
  constructor(private readonly storytellerService: StorytellerService) { }

  @Get('demand-not-validate')
  @Roles(['Admin'])
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  getAllDemand() {
    return this.storytellerService.getAllDemandNotValidate();
  }

  @Get('demand-validate')
  @Roles(['Admin'])
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  getAllDemandValidate() {
    return this.storytellerService.getAllDemandValidate();
  }

  @Roles(['Admin', 'User'])
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @Get('single/:id')
  getSingle(@Param('id', ParseIntPipe) storytellerId: number,) {
    return this.storytellerService.getSingle(storytellerId);
  }

  @Roles(['User'])
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @Post("register") 
  registerStoryteller(
    @Req() request: Request, 
    @Body() registerStorytellerDto: RegisterStorytellerDto
  ) { 
    const userId = request.user['id'];
    return this.storytellerService.registerStoryteller(userId, registerStorytellerDto);
  }

  @Roles(['Admin'])
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @Patch('validate-account/:storytellerId')
  updateRole(
    @Param('storytellerId', ParseIntPipe) storytellerId: number,
  ) {
    return this.storytellerService.validateStorytellerAccount(storytellerId);
  }
}
