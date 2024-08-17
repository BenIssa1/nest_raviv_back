import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { RegisterCommentDto } from './dto/registerComment.dto';
import { Request } from 'express';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) { }

  @Post('register')
  @UseGuards(AuthGuard('jwt'))
  register(
    @Req() request: Request,
    @Body() registerCommentDto: RegisterCommentDto
  ) {
    const userId = request.user['id'];
    return this.commentService.register(registerCommentDto, userId);
  }
}
