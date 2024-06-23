import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterFramerDto } from './dto/registerFramer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { UpdateFramerDto } from './dto/updateFramer.dto';

@Injectable()
export class FramerService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) { }

  async getAllParent() {
    return await this.prismaService.framer.findMany({
      where: { typeFramer: 'Parent' },
    });
  }

  async getAllTeacher() {
    return await this.prismaService.framer.findMany({
      where: { typeFramer: 'Teacher' },
    });
  }

  async getAllStudentStoryHistories(studentId: number) {
    const student = await this.prismaService.student.findUnique({
      where: { id: studentId }, include: {
        user: {
          select: {
            storyHistories: {
              select: {
                note: true,
                percentage: true,
                resolution: true,
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
            }
          }
        }
      }
    });
    if (!student) throw new NotFoundException('Student not found');
    return { data: student };
  }

  async getAllStudentsStoryHistories(userId: number) {
    const student = await this.prismaService.framer.findUnique({
      where: { userId }, include: {
        Student: {
          select: {
            user: {
              select: {
                storyHistories: {
                  select: {
                    note: true,
                    percentage: true,
                    resolution: true,
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
                }
              }
            }
          }
        }
      }
    });
    if (!student) throw new NotFoundException('Student not found');
    return { data: student };
  }

  async getSingle(framerId: number) {
    // ** Vérifier si l'encadreur existe
    const framer = await this.prismaService.framer.findUnique({ where: { id: framerId } });
    if (!framer) throw new NotFoundException('Framer not found!');
    return {
      data: {
        framer
      }
    };
  }

  async registerFramer(registerFramerDto: RegisterFramerDto) {
    const { email, password, lastName, typeFramer } = registerFramerDto
    let signup = await this.authService.signup({
      email, name: lastName,
      password,
      role: typeFramer == 'Teacher' ? 'Teacher' : 'Parent'
    });
    if (signup.data) {
      Reflect.deleteProperty(registerFramerDto, "email");
      Reflect.deleteProperty(registerFramerDto, "password");
      Reflect.deleteProperty(registerFramerDto, "typeFramer");
      await this.prismaService.framer.create({
        data: {
          ...registerFramerDto,
          userId: signup.user.id,
          typeFramer: typeFramer == 'Teacher' ? 'Teacher' : 'Parent'
        }
      });
      return { data: 'Framer created!' };
    }
  }

  async update(framerId: number, updateFramerDto: UpdateFramerDto) {
    const framer = await this.prismaService.framer.findUnique({ where: { id: framerId } });
    if (!framer) throw new NotFoundException('Framer not found');
    await this.prismaService.framer.update({ where: { id: framerId }, data: { ...updateFramerDto } });
    return { data: 'Framer updated!' };
  }

  async delete(framerId: number) {
    const framer = await this.prismaService.framer.findUnique({ where: { id: framerId } });
    if (!framer) throw new NotFoundException('Framer not found');
    let deleteUser = await this.authService.deleteAccount(framer.userId);
    if (deleteUser.data) {
      return { data: 'Framer deleted' };
    }
  }
}
