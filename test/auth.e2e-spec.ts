import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import * as request from 'supertest';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UserDto } from 'src/user/dto/user.dto';

let app: INestApplication;

beforeAll(async () => {
   const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
   }).compile();

   app = moduleFixture.createNestApplication();
   app.useGlobalPipes(new ValidationPipe());
   await app.init();
});

afterAll(() => app.close());

describe('AUTH', () => {

   const login: LoginDto = { username: 'sv_sergius@ukr.net', password: '111111' };
   const user: UserDto = {
      name: 'Сергій',
      phone: '+380633821942',
      email: `${Math.random()}@ukr.net`,
      password: Math.random().toString()
   };

   describe('POST /auth/login', () => {
      it('should return 401 if username does not exist, or username or password is incorrect', () => {
         return request(app.getHttpServer())
            .post('/auth/login')
            .send({ username: 'unknown', password: 'anything' })
            .expect(401)
      })
      it('should return 201 if username and password are correct ', () => {
         return request(app.getHttpServer())
            .post('/auth/login')
            .send(login)
            .expect(201)
            .expect(res => {
               expect(res.body.token).toBeDefined()
            })
      })
   })

   describe('POST /auth/register', () => {
      it('should register user', () => {
         return request(app.getHttpServer())
            .post('/auth/register')
            .set('Accept', 'application/json')
            .send(user)
            .expect(201)
            .expect(({ body }) => {
               expect(body.phone).toEqual(user.phone);
               expect(body.email).toEqual(user.email);
               expect(body.password).toBeUndefined();
            })
      });
      it('should reject duplicate registration', () => {
         return request(app.getHttpServer())
            .post('/auth/register')
            .set('Accept', 'application/json')
            .send(user)
            .expect(400)
            .expect(({ body }) => {
               expect(body.message).toEqual('Користувач вже існує');
            })
      });
   });

});
