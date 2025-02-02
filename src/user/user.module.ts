import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { BanModule } from '../ban/ban.module'
import { MailModule } from '../mail/mail.module'
import { ProfileModule } from '../profile/profile.module'
import { RoleModule } from '../role/role.module'
import { UserController } from './user.controller'
import { User } from './user.entity'
import { UserService } from './user.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		RoleModule,
		ProfileModule,
		BanModule,
		MailModule,
		forwardRef(() => AuthModule)
	],
	exports: [UserService],
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule {}
