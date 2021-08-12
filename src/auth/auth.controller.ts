import { Body, Controller, Post, Res, Request, UseGuards, HttpCode, Headers } from '@nestjs/common';
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
   async login(@Body() loginDto: LoginDto, @Request() req, @Res({ passthrough: true }) res: Response/*, @Language() locale*/) {
      return await this.authService.login(req.user, loginDto.rememberme);
   }

   @UseGuards(DoesUserExist)
   @Post('/register')
   async register(@Body() userDto: UserDto, @Headers('accept-language') lang) {
      return await this.authService.register(userDto, lang);
   }

   @HttpCode(200)
   @Post('/google')
   async google(@Body() data: GoogleDto, @Headers('accept-language') lang) {
      console.log('lang', lang);

      const user = await this.googleService.register(data.token, lang)
      return await this.authService.login(user);
   }

}
