import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "../user/user.service";
import en from '../locals/en';

@Injectable()
export class DoesUserExist implements CanActivate {
   constructor(private readonly userService: UserService) { }

   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      return this.validateRequest(request);
   }

   async validateRequest(request: any) {
      const user = await this.userService.getUserByLogin(request.body.phone, request.body.email);
      if (user) throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message: en.messages.user_exists, error: 'messages.user_exists' }, HttpStatus.BAD_REQUEST);
      return true;
   }
}