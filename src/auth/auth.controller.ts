import { Body, Controller, Post, Res, Request, UseGuards, HttpCode } from '@nestjs/common';
import { Response } from 'express';
import { GoogleService } from '../google/google.service';
import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { DoesUserExist } from './does-user-exist.guard';
import { GoogleDto } from './dto/google.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

   constructor(private authService: AuthService,
      private googleService: GoogleService,
   ) { }

   @HttpCode(200)
   @UseGuards(LocalAuthGuard)
   @Post('/login')
   login(@Body() data: LoginDto, @Request() req, @Res({ passthrough: true }) res: Response) {
      return this.authService.login(req.user, data.rememberme);
   }

   @UseGuards(DoesUserExist)
   @Post('/register')
   async register(@Body() data: UserDto) {
      return await this.authService.register(data);
   }

   @HttpCode(200)
   @Post('/google')
   async google(@Body() data: GoogleDto) {
      const user = await this.googleService.register(data.token)
      return this.authService.login(user);
   }

}
