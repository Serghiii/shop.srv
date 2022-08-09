import { Body, Controller, Get, Param, Post, Headers, Render, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { hasRole } from '../auth/role.decorator';
import { UserService } from './user.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanDto } from '../ban/dto/ban.dto';
import { JwtService } from '@nestjs/jwt';
import { ProfileDto } from '../profile/dto/profile.dto';
import { ProfileService } from '../profile/profile.service';

@Controller('user')
export class UserController {

   constructor(private readonly jwtServ: JwtService,
      private readonly userService: UserService,
      private readonly profileService: ProfileService) { }

   @Get('/activate/:value')
   @Render('registered') // підключення шаблонізатора
   async activate(@Param('value') value: string) {
      const res = await this.userService.activateUser(value);
      return { mail: res.email, phone: res.phone }
   }

   @hasRole("USER")
   @Get()
   @UseInterceptors(ClassSerializerInterceptor) // виключити пароль із відповіді
   async getAll() {
      return this.userService.getAllUsers();
   }

   @hasRole("USER")
   @Post('/profile')
   @UseInterceptors(ClassSerializerInterceptor) // виключити пароль із відповіді
   async getUserProfile(@Headers('Authorization') auth: string) {
      const { id } = await <any>this.jwtServ.decode(await auth.replace('Bearer', '').trim());
      return this.userService.getUserProfileById(id);
   }

   @hasRole("USER")
   @Post('/changepassword')
   @UseInterceptors(ClassSerializerInterceptor) // виключити пароль із відповіді
   async changePassword(@Headers('Authorization') auth: string, @Body() { password }) {
      const { id } = await <any>this.jwtServ.decode(await auth.replace('Bearer', '').trim());
      return this.userService.updateUserPassword(id, password);
   }

   @hasRole("USER")
   @Post('/changeprofile')
   async changeProfile(@Headers('Authorization') auth: string, @Body() profile: ProfileDto) {
      const user: any = await this.jwtServ.decode(await auth.replace('Bearer', '').trim());
      if (profile.phone) this.userService.updateUserPhone(user.id, profile.phone)
      return this.profileService.updateProfile(user.profile.id, profile);
   }

   @hasRole("USER")
   @Post('/changeavatar')
   async changeAvatar(@Headers('Authorization') auth: string, @Body() profile: any) {
      const user: any = await this.jwtServ.decode(await auth.replace('Bearer', '').trim());
      return this.profileService.updateAvatar(user.profile.id, profile.avatar);
   }

   @hasRole("ADMIN")
   @Post('/role')
   async addRole(@Body() dto: AddRoleDto) {
      return this.userService.addRole(dto);
   }

   @hasRole("ADMIN")
   @Post('/ban')
   async ban(@Body() dto: BanDto) {
      return this.userService.ban(dto);
   }

}
