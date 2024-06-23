import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterStorytellerDto } from './dto/registerStoryteller.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StorytellerService {
  constructor(private readonly prismaService: PrismaService) { }

  async registerStoryteller(userId: number, registerStorytellerDto: RegisterStorytellerDto) {
    await this.prismaService.storyteller.create({ data: { ...registerStorytellerDto, userId } });
    return { data: 'Storyteller created!' };
  }

  async validateStorytellerAccount(storytellerId: number) {
    const storyteller = await this.prismaService.storyteller.findUnique({ where: { id: storytellerId } });
    if (!storyteller) throw new NotFoundException('Storyteller not found');
    await this.prismaService.storyteller.update({ where: { id: storytellerId }, data: { isVerified: true } });
    await this.prismaService.user.update({ where: { id: storyteller.userId }, data: { role: 'Storyteller' } });
    return { data: 'Storyteller validated!' };
  }

  async getAllDemandNotValidate() {
    return await this.prismaService.storyteller.findMany({
      where: { isVerified: false },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            password: false
          }
        },
      }
    });
  }

  async getAllDemandValidate() {
    return await this.prismaService.storyteller.findMany({
      where: { isVerified: true },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            password: false
          }
        },
      }
    });
  }

  async getSingle(storytellerId: number) {
    // ** Vérifier si le conteur existe
    const storyteller = await this.prismaService.storyteller.findUnique({ where: { id: storytellerId } });
    if (!storyteller) throw new NotFoundException('Storyteller not found');
    return {
      data: {
        storyteller
      }
    };
  }
}
