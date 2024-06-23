import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {

  private async transport () {
    const testAccount = await nodemailer.createTestAccount();
    const transport = nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      ignoreTLS: true,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    return transport;
  }

  async sendSignupConfirmation(userEmail: string) {
    (await this.transport()).sendMail({
      from: 'app@localhost.com',
      to: userEmail,
      subject: 'Inscrtiption',
      html: '<h3>Confirmation of inscription</h3>'
    });
  }

  async sendResetPassword(userEmail: string, url: string, token: string) {
    (await this.transport()).sendMail({
      from: 'app@localhost.com',
      to: userEmail,
      subject: 'Reset Password',
      html: `
        <a href="${url}">Reset password</a>
        <p>Token <strong>${token}</strong> </p>
        <p>Code will expire in 15 minutes</p>
      `
    });
  }
}
