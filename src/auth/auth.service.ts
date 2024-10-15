import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import * as speakeasy from 'speakeasy'
import { ConfigService } from '@nestjs/config';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from 'src/mailer/mailer.service';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemand.dto';
import { ResetPasswordConfirmationDto } from './dto/resetPasswordConfirmation.dto';
import { UpdateAccountDto } from './dto/updateAccount.dto';
import { UpdateAccountRoleDto } from './dto/updateAccountRole.dto';
import { getToken, sendSMS } from 'src/utils/otp.api';
import { VerifiedOtpDto } from './dto/verifiedOtp.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async signup(signupDto: SignupDto) {
    const { email, password, name, role, pseudo, phone } = signupDto;
    // ** Vérifier si l'utilisateur est déja inscrit
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (user) throw new ConflictException('User already exists');
    // ** Hasher le mot de passe
    const hash = await bcrypt.hash(password, 10);
    // ** Génerer un digit number
    let numberDigit = ("" + Math.random()).substring(2, 8);
    // ** Hasher le nombre digit
    const hashNumberDigit = await bcrypt.hash(numberDigit, 10);
    // ** Enregistrer l'utilisateur dans la base de données
    let userCreated = await this.prismaService.user.create({
      data: {
        email,
        name,
        password: hash,
        resetPasswordToken: null,
        role,
        pseudo,
        phone,
        otpToken: hashNumberDigit,
        otpExpire: new Date((new Date()).getTime() + 15 * 60000)
      }
    });

    if (phone) {
      // Get token api sms
      let get_token = getToken('H6wUaOYqXGESAm9Awa3rOUrBcYeUaC8i', '6nclt3IMRm30NIvr');
      // Send sms
      get_token.then(
        response =>
          sendSMS('2250000', phone, `OTP: ${numberDigit}`, response)
            .then(response => console.log(response))
      );
    }

    // ** Retourner une réponse de succès
    return { data: 'User successfully created', user: userCreated };
  }

  async signin(signinDto: SigninDto) {
    const { username, password } = signinDto;
    // ** Vérifier si l'utilisateur existe
    const user = await this.prismaService.user.findFirst({
      where: { OR: [{ pseudo: username }, { email: username }] }
    });
    if (!user) throw new NotFoundException('User not found');
    // ** Comparer le mot de passe
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Password does not match');
    // ** Retourner un token jwt
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const token = this.jwtService.sign(payload, {
      expiresIn: '2h',
      secret: this.configService.get('SECRET_KEY')
    });

    /* Test */

    let tokenTest = getToken('H6wUaOYqXGESAm9Awa3rOUrBcYeUaC8i', '6nclt3IMRm30NIvr');
    tokenTest.then(response => sendSMS('0700139183', '0506562344', 'Hello guy', response).then(response => console.log(response)))
    /* console.log(tokenTest)
    tokenTest.then(response => console.log(sendSMS('0700139183', '0700139183', 'Hello guy', response))) */

    /* Test */

    return {
      token, user: {
        id: user.id,
        username: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      }
    };
  }

  async verifiedOtp(userId: number, verifiedOtpDto: VerifiedOtpDto) {
    const { otp } = verifiedOtpDto;

    // ** Vérifier si l'utilisateur existe
    const user = await this.prismaService.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Utilisateur non trouvé !');

    // ** Comparer le mot de passe
    const match = await bcrypt.compare(otp, user.otpToken);
    if (!match) throw new UnauthorizedException('Le code est incorrect !');

    if (user.otpExpire < new Date()) throw new UnauthorizedException('Le code est expiré !');
    await this.prismaService.user.update({ where: { id: userId }, data: { isVerified: true } });
    return { data: 'Le compte est verifié !' };
  }

  async resetPasswordDemand(resetPasswordDemandDto: ResetPasswordDemandDto) {
    const { email } = resetPasswordDemandDto;
    // ** Vérifier si l'utilisateur existe
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');
    const code = speakeasy.totp({
      secret: this.configService.get('OTP_CODE'),
      digits: 5,
      step: 60 * 15,
      encoding: 'base32'
    });
    // ** Hasher le code
    const hash = await bcrypt.hash(code, 10);
    await this.prismaService.user.update({ where: { email }, data: { resetPasswordToken: hash } });
    const url = `http://localhost/auth/reset-password-confirmation/${hash}`;
    await this.mailerService.sendResetPassword(email, url, hash);
    return { data: 'Reset password mail has been sent' };
  }

  async resetPasswordConfirmation(resetPasswordConfirmationDto: ResetPasswordConfirmationDto) {
    const { email, password, token } = resetPasswordConfirmationDto;
    // ** Vérifier si l'utilisateur existe
    const user = await this.prismaService.user.findUnique({ where: { email, resetPasswordToken: token } });
    if (!user) throw new NotFoundException('User not found/ Invalid/expired token');
    const hash = await bcrypt.hash(password, 10);
    await this.prismaService.user.update({ where: { email }, data: { password: hash, resetPasswordToken: null } });
    return { data: 'Password updated' };
  }

  async deleteAccount(userId: number) {
    // ** Vérifier si l'utilisateur existe
    const user = await this.prismaService.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    await this.prismaService.user.delete({ where: { id: userId } });
    return { data: 'User successfully deleted' };
  }

  async getSingleAccount(userId: number) {
    // ** Vérifier si l'utilisateur existe
    const user = await this.prismaService.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    return {
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
      }
    };
  }

  async update(userId: number, updateAccountDto: UpdateAccountDto) {
    const user = await this.prismaService.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    await this.prismaService.user.update({ where: { id: userId }, data: { ...updateAccountDto } });
    return { data: 'User updated!' };
  }

  async updateRole(userId: number, updateAccountRoleDto: UpdateAccountRoleDto) {
    const user = await this.prismaService.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    await this.prismaService.user.update({ where: { id: userId }, data: { ...updateAccountRoleDto } });
    return { data: 'User role updated!' };
  }
}
