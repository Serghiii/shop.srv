import { Injectable, UnauthorizedException } from '@nestjs/common';
import { google, Auth } from 'googleapis';
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { translate } from '../locales/translate';
import { ExUserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class GoogleService {
   oauthClient: Auth.OAuth2Client;

   constructor(private userService: UserService,
   ) {
      this.oauthClient = new google.auth.OAuth2(
         process.env.GOOGLE_AUTH_CLIENT_ID,
         process.env.GOOGLE_AUTH_CLIENT_SECRET
      );
   }

   private async getUserData(token: string) {
      const userInfoClient = await google.oauth2('v2').userinfo;
      this.oauthClient.setCredentials({
         access_token: token
      })
      const userInfoResponse = await userInfoClient.get({
         auth: this.oauthClient
      });
      return userInfoResponse.data;
   }

   public async register(token: string, lang: string = 'uk') {
      const tokenInfo = await this.oauthClient.getTokenInfo(token);
      if (!tokenInfo.email_verified) throw new UnauthorizedException({ message: translate('messages.user_not_verified', lang) })
      const user = await this.userService.getUserByMail(tokenInfo.email)
      if (user) {
         return user
      } else {
         const userInfo = await this.getUserData(token)
         const newUser: ExUserDto = {
            name: userInfo.name,
            phone: null,
            email: userInfo.email,
            password: await bcrypt.hash(randomUUID(), 5),
            avatar: userInfo.picture
         }
         const user = await this.userService.createUser(newUser, 'USER', lang, true)
         return await this.userService.getUserByMail(user.email)
      }
   }

}
