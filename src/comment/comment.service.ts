import { Injectable } from '@nestjs/common';
import { RegisterCommentDto } from './dto/registerComment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) { }

  async register(registerCommentDto: RegisterCommentDto, userId: number) {
    await this.prismaService.comment.create({ data: { ...registerCommentDto, userId } });
    return { data: 'Comment created!' };
  }
}
