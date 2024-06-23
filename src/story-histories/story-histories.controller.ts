import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { StoryHistoriesService } from './story-histories.service';
import { RegisterStoryHistoriesDto } from './dto/registerStoryHistories.dto';
import { Request } from 'express';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';
import {  RegisterStoryHistoryResolutionDto } from './dto/registerStoryHistoryResolution.dto';

@Controller('story-histories')
export class StoryHistoriesController {
  constructor(
    private readonly storyHistoriesService: StoryHistoriesService
  ) { }

  @Get('get_all_user_story_histories')
  @UseGuards(AuthGuard('jwt'))
  getAllStudent(
    @Req() request: Request,
  ) {
    const userId = request.user['id'];
    return this.storyHistoriesService.getAllUserStoryHistories(userId);
  }


  @UseGuards(AuthGuard('jwt'))
  @Post("register") 
  registerStoryHistories(
    @Req() request: Request, 
    @Body() registerStoryHistoriesDto: RegisterStoryHistoriesDto
  ) { 
    const userId = request.user['id'];
    return this.storyHistoriesService.registerStoryHistories(registerStoryHistoriesDto, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put("register_resolution") 
  registerStoryHistoryResolution(
    @Req() request: Request, 
    @Body() registerStoryHistoryResolutionDto: RegisterStoryHistoryResolutionDto
  ) { 
    const userId = request.user['id'];
    return this.storyHistoriesService.registerStoryHistoryHistoryResolution(registerStoryHistoryResolutionDto, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('single/:id')
  getSingle(@Param('id', ParseIntPipe) storyHistoryId: number,) {
    return this.storyHistoriesService.getSingle(storyHistoryId);
  }

}
