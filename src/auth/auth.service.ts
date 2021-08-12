import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.entity';
import { translate } from '../locales/translate';

@Injectable()
export class AuthService {

   constructor(private userService: UserService,
      private jwtService: JwtService) { }

   public async login(user: User, rememberme: boolean = false) {
      return await this.generateToken(user, rememberme);
   }

   public async validateUser(username: string, password: string, lang: string = 'uk') {
      const user = await this.userService.getUserByLogin(username, username);
      if (user) {
         const passwordEquals = await bcrypt.compare(password, user.password);
         if (passwordEquals) {
            if (!user.active) throw new UnauthorizedException({ message: translate('messages.user_not_activated', lang) });
            if (user.ban) throw new UnauthorizedException({ message: translate('messages.user_banned', lang) });
            return user;
         }
      }
      throw new UnauthorizedException({ message: translate('messages.login_password_not_corrected', lang) });
   }

   public async validatePayload(payload: any, lang: string = 'uk') {
      const user = await this.userService.getUserByLogin(payload.phone, payload.email);
      if (user && user.active && user.id == Number(payload.id) && !user.ban) return user;
      throw new UnauthorizedException({ message: translate('messages.user_not_activated', lang) });
   }

   public async register(userDto: UserDto, lang: string = 'uk') {
      const hashPassword = await bcrypt.hash(userDto.password, 5);
      const user = await this.userService.createUser({ ...userDto, password: hashPassword }, 'USER', lang);
      return { phone: user.phone, email: user.email };
   }

   private async generateToken(user: User, rememberme: boolean = false) {
      const payload = { id: user.id, phone: user.phone, email: user.email, roles: user.roles, profile: user.profile };
      return {
         token: await this.jwtService.sign(payload, {
            expiresIn: rememberme ? process.env.TOKEN_EXPIRATION_RM : process.env.TOKEN_EXPIRATION
         })
      };
   }

}
