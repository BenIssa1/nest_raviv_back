import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemand.dto';
import { ResetPasswordConfirmationDto } from './dto/resetPasswordConfirmation.dto';
import { UpdateAccountDto } from './dto/updateAccount.dto';
import { UpdateAccountRoleDto } from './dto/updateAccountRole.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { ApiTags } from '@nestjs/swagger';
import { VerifiedOtpDto } from './dto/verifiedOtp.dto';

@ApiTags('Authentification')
@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("signup")
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post("signin")
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @Patch('verified-otp/:id')
  verifiedOtp(
    @Param('id', ParseIntPipe) userId: number,
    @Body() verifiedOtpDto: VerifiedOtpDto,
  ) {
    return this.authService.verifiedOtp(userId, verifiedOtpDto);
  }

  @Post("reset-password")
  resetPasswordDemand(@Body() resetPasswordDemandDto: ResetPasswordDemandDto) {
    return this.authService.resetPasswordDemand(resetPasswordDemandDto);
  }

  @Post("reset-password-confirmation")
  resetPasswordConfirmation(@Body() resetPasswordConfirmationDto: ResetPasswordConfirmationDto) {
    return this.authService.resetPasswordConfirmation(resetPasswordConfirmationDto);
  }

  @Roles(['Admin'])
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @Delete('delete/:id')
  deleteAccount(@Param('id', ParseIntPipe) userId: number,) {
    return this.authService.deleteAccount(userId);
  }

  @Roles(['Admin', 'User'])
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @Get('single/:id')
  getSingleAccount(@Param('id', ParseIntPipe) userId: number,) {
    return this.authService.getSingleAccount(userId);
  }

  @Roles(['Admin', 'User'])
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.authService.update(userId, updateAccountDto);
  }

  @Roles(['Admin'])
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @Patch('update-role/:id')
  updateRole(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateAccountRoleDto: UpdateAccountRoleDto,
  ) {
    return this.authService.updateRole(userId, updateAccountRoleDto);
  }
}
