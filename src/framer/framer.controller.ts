import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FramerService } from './framer.service';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { RegisterFramerDto } from './dto/registerFramer.dto';
import { UpdateFramerDto } from './dto/updateFramer.dto';
import { Request } from 'express';

@ApiTags('Framer')
@Controller('framer')
export class FramerController {
  constructor(
    private readonly framerService: FramerService
  ) { }

  @Get('list-type-parent')
  @Roles(['Admin'])
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  getAllParent() {
    return this.framerService.getAllParent();
  }

  @Get('list-type-teacher')
  @Roles(['Admin'])
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  getAllTeacher() {
    return this.framerService.getAllTeacher();
  }

  @Get('students/story_histories_list')
  @Roles(['Teacher', 'Parent'])
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  getAllStudentsStoryHistories(
    @Req() request: Request, 
  ) {
    const userId = request.user['id'];
    return this.framerService.getAllStudentsStoryHistories(userId);
  }

  @Get(':studentId/story_histories_list')
  @Roles(['Teacher', 'Parent'])
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  getAllStudentStoryHistories(
    @Param('studentId', ParseIntPipe) studentId: number,
  ) {
    return this.framerService.getAllStudentStoryHistories(studentId);
  }

  @Roles(['Admin', 'User']) 
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @Get('single/:id')
  getSingle(@Param('id', ParseIntPipe) framerId: number,) {
    return this.framerService.getSingle(framerId);
  }

  @Post("register") 
  registerStoryteller(
    @Body() registerFramerDto: RegisterFramerDto
  ) { 
    return this.framerService.registerFramer(registerFramerDto);
  }

  @Roles(['Teacher', 'Parent'])
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) framerId: number,
    @Body() updateFramerDto: UpdateFramerDto,
  ) {
    return this.framerService.update(framerId, updateFramerDto);
  }

  @Roles(['Admin','Teacher', 'Parent'])
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) framerId: number,
  ) {
    return this.framerService.delete(framerId);
  }
}
