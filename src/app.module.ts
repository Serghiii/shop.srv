import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
// import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ActivationModule } from "./activation/activation.module"
import { AuthModule } from "./auth/auth.module"
import { BanModule } from "./ban/ban.module"
import { CartModule } from "./cart/cart.module"
import { CartDetailsModule } from "./cartdetails/cartdetails.module"
import { CategoryModule } from "./category/category.module"
import { GoogleModule } from "./google/google.module"
import { GroupModule } from "./group/group.module"
import { ProductModule } from "./product/product.module"
import { ProductInfoModule } from "./productinfo/productinfo.module"
import { ProductpicsModule } from "./productpics/productpics.module"
import { ProfileModule } from "./profile/profile.module"
import { PropModule } from "./prop/prop.module"
import { PropdetailModule } from "./propdetail/propdetail.module"
import { RoleModule } from "./role/role.module"
import { UserModule } from "./user/user.module"
import Entities from './db/entities'
import Migrations from './db/migrations'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.${process.env.NODE_ENV}.env`, '.env']
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'static'),
    //   exclude: ['/api*'],
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DB,
      entities: Entities,
      migrations: Migrations,
      migrationsRun: process.env.MIGRATIONS_RUN === 'true',
      charset: process.env.DB_CHARSET,
      timezone: process.env.DB_TIMEZONE,
      synchronize: process.env.SYNCHRONIZE === 'true'
    }),
    ActivationModule,
    AuthModule,
    BanModule,
    CartModule,
    CartDetailsModule,
    CategoryModule,
    GoogleModule,
    GroupModule,
    ProductModule,
    ProductInfoModule,
    ProductpicsModule,
    ProfileModule,
    PropModule,
    PropdetailModule,
    RoleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }