import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterStoryHistoriesDto } from './dto/registerStoryHistories.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterStoryHistoryResolutionDto } from './dto/registerStoryHistoryResolution.dto';

@Injectable()
export class StoryHistoriesService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async registerStoryHistories(registerStoryHistoriesDto: RegisterStoryHistoriesDto, userId: number) {
    const { tale_id, questions } = registerStoryHistoriesDto
    // ** Vérifier si le story histories existe
    const storyHistories = await this.prismaService.storyHistories.findFirst({ where: { taleId: tale_id, userId: userId } });
    if (storyHistories) throw new NotFoundException('Story history exists');

    // ** Vérifier si l'encadreur existe
    const tale = await this.prismaService.tale.findUnique({
      where: { id: tale_id },
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
        }
      }
    });
    if (!tale) throw new NotFoundException('Tale not found!');

    // Tableaux des moyennes des questions
    let averageQuestionsArray = []

    // Boucle sur les questions
    questions.map((data, index) => {
      // Table de moyenne d'une question
      let averageOneQuestionArray = [];
      // La question du conte avec les resultats
      let questionResponses = tale.question[index];
      // Boucle sur les reponses d'une question
      data.responses.map((dataResponse, index) => {
        // Verifie si la valuer correspond et on ajoute 10 || 0
        if (dataResponse.result === questionResponses.response[index].result) {
          averageOneQuestionArray.push(10);
        } else {
          averageOneQuestionArray.push(0);
        }
      });
      // Calcule la moyenne de chaque question
      let sumaverageOneQuestion = averageOneQuestionArray.reduce(
        (accumulator, currentValue) => accumulator + currentValue, 0
      );
      // On ajoute dans le tableau des moyennes des questions
      averageQuestionsArray.push(Math.round(sumaverageOneQuestion / data.responses.length));
    });

    // Calcule la moyenne des moyennes des questions
    let sumaverageAllQuestions = averageQuestionsArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue, 0
    );

    // La moyenne final
    let averageNote = Math.round(sumaverageAllQuestions / questions.length);
    // register story history
    await this.prismaService.storyHistories.create({
      data: {
        taleId: tale_id,
        userId: userId,
        note: averageNote,
        percentage: 75
      }
    });
    return { data: 'Story history created!' };
  }

  async registerStoryHistoryHistoryResolution(registerStoryHistoryResolutionDto: RegisterStoryHistoryResolutionDto, userId: number) {
    const { tale_id, resolution } = registerStoryHistoryResolutionDto
    // ** Vérifier si le story histories existe
    const storyHistories = await this.prismaService.storyHistories.findFirst({ where: { taleId: tale_id, userId: userId } });
    if (!storyHistories) throw new NotFoundException('Story history not found');

    await this.prismaService.storyHistories.update({
      where: { id: storyHistories.id }, data: {
        resolution,
        percentage: storyHistories.percentage + 25
      }
    });
    return { data: 'Story history registed!' };
  }

  async getAllUserStoryHistories(userId: any) {
    return await this.prismaService.storyHistories.findMany({
      where: { userId },
      include: {
        Tale: {
          select: {
            title: true,
            typeTale: true,
            description: true,
            videoUrl: true,
            language: true,
            imageBackground: true,
          }
        }
      }
    });
  }

  async getSingle(storyHistoryId: number) {
    // ** Vérifier si l'historique existe
    const storyHistory = await this.prismaService.storyHistories.findUnique({
      where: { id: storyHistoryId }, include: {
        Tale: {
          select: {
            title: true,
            typeTale: true,
            description: true,
            videoUrl: true,
            language: true,
            imageBackground: true,
          }
        }
      }
    });
    
    if (!storyHistory) throw new NotFoundException('Story history not found');
    return {
      data: {
        storyHistory
      }
    };
  }
}
