import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.entity';
import en from '../locals/en';

@Injectable()
export class AuthService {

   constructor(private userService: UserService,
      private jwtService: JwtService) { }

   public login(user: User, rememberme: boolean = false) {
      return this.generateToken(user, rememberme);
   }

   public async validateUser(username: string, password: string) {
      const user = await this.userService.getUserByLogin(username, username);
      if (user) {
         const passwordEquals = await bcrypt.compare(password, user.password);
         if (passwordEquals) {
            if (!user.active) throw new UnauthorizedException({ statusCode: HttpStatus.UNAUTHORIZED, message: en.messages.user_not_activated, error: 'messages.user_not_activated' });
            if (user.ban) throw new UnauthorizedException({ statusCode: HttpStatus.UNAUTHORIZED, message: en.messages.user_banned, error: 'messages.user_banned' });
            return user;
         }
      }
      throw new UnauthorizedException({ statusCode: HttpStatus.UNAUTHORIZED, message: en.messages.login_password_not_corrected, error: 'messages.login_password_not_corrected' });
   }

   public async validatePayload(payload: any) {
      const user = await this.userService.getUserByLogin(payload.phone, payload.email);
      if (user && user.active && user.id == Number(payload.id) && !user.ban) return user;
      throw new UnauthorizedException({ statusCode: HttpStatus.UNAUTHORIZED, message: en.messages.user_not_activated, error: 'messages.user_not_activated' });
   }

   public async register(userDto: UserDto) {
      const hashPassword = await bcrypt.hash(userDto.password, 5);
      const user = await this.userService.createUser({ ...userDto, password: hashPassword }, 'USER');
      return { phone: user.phone, email: user.email };
   }

   private generateToken(user: User, rememberme: boolean = false) {
      const payload = { id: user.id, phone: user.phone, email: user.email, roles: user.roles, profile: user.profile };
      return {
         token: this.jwtService.sign(payload, {
            expiresIn: rememberme ? process.env.TOKEN_EXPIRATION_RM : process.env.TOKEN_EXPIRATION
         })
      };
   }

}
