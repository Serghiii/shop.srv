import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "../user/user.service";
import { translate } from '../locales/translate';

@Injectable()
export class DoesUserExist implements CanActivate {
   constructor(private readonly userService: UserService) { }

   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      return this.validateRequest(request);
   }

   async validateRequest(request) {
      const user = await this.userService.getUserByLogin(request.body.phone, request.body.email);
      if (user) throw new HttpException(translate('messages.user_exist', request.headers['lang']), HttpStatus.BAD_REQUEST);
      return true;
   }
}