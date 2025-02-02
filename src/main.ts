// import { ValidationPipe } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as cookieParser from 'cookie-parser'
import { json, urlencoded } from 'express'
import helmet from 'helmet'
import { join } from 'path'
import { AppModule } from './app.module'
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const PORT = process.env.PORT || 5000
	const app = await NestFactory.create<NestExpressApplication>(AppModule)
	app.setGlobalPrefix('api/v1')
	// app.enableVersioning({
	//   type: VersioningType.URI,
	// });
	if (process.env.NODE_ENV === 'production') {
		app.use(
			helmet({
				crossOriginResourcePolicy: { policy: 'cross-origin' },
				crossOriginEmbedderPolicy: false
			})
		)
	}
	app.enableCors({
		origin: [process.env.CORS_ORIGIN || ''],
		methods: ['GET', 'POST'],
		credentials: true
	})
	app.useStaticAssets(join(__dirname, '..', 'static'), { prefix: '/static/' })
	app.setBaseViewsDir(join(__dirname, '..', 'views'))
	app.setViewEngine('hbs')
	app.use(json({ limit: '2mb' }))
	app.use(urlencoded({ extended: true, limit: '2mb' }))
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true
		})
	)
	app.use(cookieParser())
	// const config = new DocumentBuilder()
	//   .setTitle('Server')
	//   .setDescription('Server API description')
	//   .setVersion('1.0')
	//   .addTag('server')
	//   .build();
	// const document = SwaggerModule.createDocument(app, config);
	// SwaggerModule.setup('api', app, document);

	await app.listen(PORT, () => console.log(`Started at port: ${PORT}`))
}
bootstrap()
