import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
// import { Exception } from 'handlebars';
import { Activation } from '../activation/activation.entity';
import { ActivationService } from '../activation/activation.service';
import { BanService } from '../ban/ban.service';
import { BanDto } from '../ban/dto/ban.dto';
import { MailService } from '../mail/mail.service';
import { RoleService } from '../role/role.service';
import { DataSource, Repository } from 'typeorm';
import { AddRoleDto } from './dto/add-role.dto';
import { ExUserDto, UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { Profile } from '../profile/profile.entity';
import * as bcrypt from 'bcryptjs';
import { Cart } from '../cart/cart.entity';
import { translate } from '../locales/translate';

@Injectable()
export class UserService {

   constructor(
      @InjectDataSource() private datasource: DataSource,
      @InjectRepository(User) private userRepository: Repository<User>,
      private roleService: RoleService,
      private activationService: ActivationService,
      private banService: BanService,
      private mailService: MailService,
   ) { }

   async createUser(dto: UserDto, role: string, lang: string = 'uk', isgoogle: boolean = false): Promise<User> {
      try {
         return await this.datasource.transaction(async manager => {
            const user = manager.create(User);
            user.phone = dto.phone;
            user.email = dto.email;
            user.password = dto.password;
            if (isgoogle) user.active = true
            const role_ = await this.roleService.getRole(role);
            user.roles = [];
            user.roles.push(role_);
            const res = await manager.save(user);
            const profile = manager.create(Profile);
            profile.name = dto.name;
            if (isgoogle) profile.avatar = (dto as ExUserDto).avatar
            profile.user = res;
            await manager.save(profile);
            const cart = manager.create(Cart);
            cart.user = res;
            await manager.save(cart);
            if (!isgoogle) {
               const activation = manager.create(Activation);
               activation.user = res;
               activation.uuid = randomUUID();
               await manager.save(activation);
               await this.mailService.sendMail(user.email, `${process.env.API_URL}/user/activate/${activation.uuid}`, lang)
            }
            return res;
         });
      } catch (e) {
         // throw new HttpException(translate('messages.create_user_error', lang), HttpStatus.BAD_REQUEST);
         throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message: 'User creation error', error: 'create_user_error' }, HttpStatus.BAD_REQUEST);
      }
   }

   async activateUser(uuid: string, lang: string = 'uk'): Promise<User> {
      try {
         return await this.datasource.transaction(async manager => {
            const activation = await this.activationService.getActivation(uuid);
            const user = await this.getUserById(activation.user.id);
            user.active = true;
            await manager.save(user);
            await manager.remove(activation);
            return user;
         })
      } catch (e) {
         // throw new HttpException(translate('messages.activate_user_error', lang), HttpStatus.BAD_REQUEST);
         throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message: 'User activation error', error: 'activate_user_error' }, HttpStatus.BAD_REQUEST);
      }
   }

   async updateUserPassword(id: number, password: string, lang: string = 'uk'): Promise<User> {
      try {
         const user = await this.userRepository.findOneBy({ id });
         user.password = await bcrypt.hash(password, 5);
         await this.userRepository.save(user);
         return user;
      } catch (e) {
         // throw new HttpException(translate('messages.password_change_error', lang), HttpStatus.BAD_REQUEST);
         throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Password change error', error: 'password_change_error' }, HttpStatus.BAD_REQUEST);
      }
   }

   async updateUserPhone(id: number, phone: string, lang: string = 'uk'): Promise<User> {
      try {
         const user = await this.userRepository.findOneBy({ id });
         user.phone = phone;
         await this.userRepository.save(user);
         return user;
      } catch (e) {
         // throw new HttpException(translate('messages.phone_change_error', lang), HttpStatus.BAD_REQUEST);
         throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Phone change error', error: 'phone_change_error' }, HttpStatus.BAD_REQUEST);
      }
   }

   async getAllUsers() {
      return await this.userRepository.find();
   }

   async getUserByLogin(phone: string, email: string) {
      return await this.userRepository.findOne({ where: [{ phone: phone }, { email: email }], relations: ['roles', 'profile', 'ban'] });
   }

   async getUserByMail(email: string) {
      return await this.userRepository.findOne({ where: [{ email: email }], relations: ['roles', 'profile', 'ban'] });
   }

   async getUserById(id: number) {
      return await this.userRepository.findOneOrFail({ where: { id } });
   }

   async getUserProfileById(id: number) {
      const user = await this.userRepository.findOneOrFail({ where: { id }, relations: { profile: true } });
      return { name: user.profile.name, phone: user.phone, email: user.email, gender: user.profile.gender, avatar: user.profile.avatar }
   }

   async addRole(dto: AddRoleDto, lang: string = 'uk') {
      try {
         const user = await this.userRepository.findOneOrFail({ where: { id: dto.userId }, relations: ['roles'] });
         const role = await this.roleService.getRole(dto.name);
         if (user.roles.some(role_ => role_ == role)) {
            throw new Error(); //Exception;
         }
         // user.roles = [];
         user.roles.push(role);
         this.userRepository.save(user);
         return dto;
      } catch (e) {
         // throw new HttpException(translate('messages.user_role_not_found', lang), HttpStatus.NOT_FOUND);
         throw new HttpException({ statusCode: HttpStatus.NOT_FOUND, message: 'User role not found', error: 'user_role_not_found' }, HttpStatus.NOT_FOUND);
      }
   }

   async ban(dto: BanDto, lang: string = 'uk') {
      const user = await this.userRepository.findOne({ where: { id: dto.userId }, relations: ['bans'] });
      if (!user) {
         // throw new HttpException(translate('messages.user_not_found', lang), HttpStatus.NOT_FOUND);
         throw new HttpException({ statusCode: HttpStatus.NOT_FOUND, message: 'User not found', error: 'user_not_found' }, HttpStatus.NOT_FOUND);
      }
      if (user.ban) {
         // throw new HttpException(translate('messages.user_banned', lang), HttpStatus.BAD_REQUEST);
         throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message: 'User banned', error: 'user_banned' }, HttpStatus.BAD_REQUEST);
      }
      return await this.banService.createBan(user, dto.reason);
   }

}

