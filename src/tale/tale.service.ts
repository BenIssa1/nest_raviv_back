import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterTaleDto } from './dto/registerTale.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTaleDto } from './dto/updateTale.dto';

@Injectable()
export class TaleService {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async getAll() {
    return await this.prismaService.tale.findMany({
      include: {
        question: {
          select: {
            id: true,
            label: true,
            response: {
              select: {
                id: true,
                label: true,
                result: true
              }
            }
          }
        }, comments: {
          select: {
            id: true,
            message: true,
            user: {
              select: {
                name: true,
              }
            }
          }
        }
      }
    });
  }

  async registerTale(registerTaleDto: RegisterTaleDto, userId: number) {
    const {
      title, description, videoUrl, typeTale, language, imageBackground, questions
    } = registerTaleDto;

    // ** Vérifier si le conteur existe
    const storyteller = await this.prismaService.storyteller.findUnique({ where: { userId: userId } });
    if (!storyteller) throw new NotFoundException('Storyteller not found');

    const taleCreated = await this.prismaService.tale.create({
      data: {
        title, description, videoUrl, typeTale, language, imageBackground, storytellerId: storyteller.id
      }
    });

    questions.map(async (question) => {
      const questionCreated = await this.prismaService.question.create({
        data: {
          label: question.label, taleId: taleCreated.id
        }
      });

      question.responses.map(async (data) => {
        await this.prismaService.response.create({
          data: {
            label: data.label,
            result: data.result,
            questionId: questionCreated.id
          }
        });
      })
    })

    return { data: 'Tale created!' };
  }

  async update(taleId: number, updateTaleDto: UpdateTaleDto) {
    const {
      title, description, videoUrl, typeTale, language, imageBackground, questions
    } = updateTaleDto;

    const tale = await this.prismaService.tale.findUnique({ where: { id: taleId } });
    if (!tale) throw new NotFoundException('Tale not found');
    await this.prismaService.tale.update({
      where: { id: taleId }, data: {
        title, description, videoUrl, typeTale, language, imageBackground,
      }
    });

    questions.map(async (question) => {
      const getQuestion = await this.prismaService.question.findUnique({ where: { id: question.id } });
      if (!getQuestion) throw new NotFoundException('Question not found');
      await this.prismaService.question.update({
        where: { id: question.id }, data: {
          label: question.label
        }
      });

      question.responses.map(async (data) => {
        const getResponse = await this.prismaService.response.findUnique({ where: { id: data.id } });
        if (!getResponse) throw new NotFoundException('Response not found');
        await this.prismaService.response.update({
          where: { id: data.id }, data: {
            label: data.label,
            result: data.result
          }
        });
      })
    })
    
    return { data: 'Tale updated!' };
  }

  async getSingle(taleId: number) {
    // ** Vérifier si l'elève existe
    const tale = await this.prismaService.tale.findUnique(
      {
        where: { id: taleId },
        include: {
          question: {
            select: {
              id: true,
              label: true,
              response: {
                select: {
                  id: true,
                  label: true,
                  result: true
                }
              }
            }
          }, comments: {
            select: {
              id: true,
              message: true,
              user: {
                select: {
                  name: true,
                }
              }
            }
          }
        }
      });

    if (!tale) throw new NotFoundException('Tale not found');
    return {
      data: {
        tale
      }
    };
  }

  async delete(taleId: number) {
    const tale = await this.prismaService.student.findUnique({ where: { id: taleId } });
    if (!tale) throw new NotFoundException('Tale not found');
    await this.prismaService.tale.delete({ where: { id: taleId } });
    return { data: 'Tale deleted' };
  }

}
