import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { RegisterStudentDto } from './dto/registerStudent.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Request } from 'express';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService
  ) { }

  @Get('list')
  @Roles(['Teacher', 'Parent'])
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  getAllStudent(
    @Req() request: Request,
  ) {
    const userId = request.user['id'];
    return this.studentService.getAllStudent(userId);
  }

  @Roles(['Teacher', 'Parent', 'Student'])
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @Get('single/:id')
  getSingle(@Param('id', ParseIntPipe) studentId: number,) {
    return this.studentService.getSingle(studentId);
  }

  @Roles(['Teacher', 'Parent'])
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @Post("register")
  registerStudent(
    @Req() request: Request,
    @Body() registerFramerDto: RegisterStudentDto
  ) {
    const userId = request.user['id'];
    return this.studentService.registerStudent(registerFramerDto, userId);
  }

  @Roles(['Teacher', 'Parent', 'Student'])
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) studentId: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.update(studentId, updateStudentDto);
  }

  @Roles(['Teacher', 'Parent', 'Student'])
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) studentId: number) {
    return this.studentService.delete(studentId);
  }
}

