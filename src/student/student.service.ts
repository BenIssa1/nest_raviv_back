import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterStudentDto } from './dto/registerStudent.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { UpdateStudentDto } from './dto/updateStudent.dto';

@Injectable()
export class StudentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) { }

  async getAllStudent(userId: any) {
    return await this.prismaService.framer.findUnique({
      where: { userId },
      include: {
        Student: {
          select: {
            lastName : true, 
            firstName: true, 
            classroom: true, 
            establisment: true
          }
        }
      }
    });
  }

  async getSingle(studentId: number) {
    // ** Vérifier si l'elève existe
    const student = await this.prismaService.student.findUnique({ where: { id: studentId } });
    if (!student) throw new NotFoundException('Student not found');
    return {
      data: {
        student
      }
    };
  }

  async registerStudent(registerStudentDto: RegisterStudentDto, userId: number) {
    let randomNumber = Math.random() * 100;
    const { password, lastName, firstName, pseudo } = registerStudentDto;
    // ** Vérifier si l'utilisateur est déja inscrit
    const user = await this.prismaService.user.findUnique({ where: { pseudo } });
    if (user) throw new ConflictException('Pseudo already exists');
    let signup = await this.authService.signup({
      email: firstName + lastName + randomNumber + "@gmail.com",
      name: lastName,
      password,
      pseudo,
      phone: null,
      role: 'Student'
    });
    if (signup.data) {
      Reflect.deleteProperty(registerStudentDto, "password");
      Reflect.deleteProperty(registerStudentDto, "pseudo");
      const framer = await this.prismaService.framer.findUnique({ where: { userId } });
      if (!framer) throw new NotFoundException('Framer not found!');
      await this.prismaService.student.create({
        data: {
          ...registerStudentDto,
          userId: signup.user.id,
          framerId: framer.id
        }
      });
      return { data: 'Student created!' };
    }
  }

  async update(studentId: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.prismaService.student.findUnique({ where: { id: studentId } });
    if (!student) throw new NotFoundException('Student not found');
    await this.prismaService.student.update({ where: { id: studentId }, data: { ...updateStudentDto } });
    return { data: 'Student updated!' };
  }

  async delete(studentId: number) {
    const student = await this.prismaService.student.findUnique({where: {id: studentId}});
    if (!student) throw new NotFoundException('Student not found');
    await this.prismaService.student.delete({where: {id: studentId}});
    return {data: 'Student deleted'};
  }
}
