import 'multer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import * as Joi from 'joi';

import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../db/database.module';

@Module({
	controllers: [AppController],
	imports: [
		ConfigModule.forRoot({
			cache: true,
			expandVariables: true,
			isGlobal: true,
			validationSchema: Joi.object({
				NODE_ENV: Joi.string().required(),
				BACKEND_HOST: Joi.string().required(),
				BACKEND_PORT: Joi.number().required(),
				POSTGRES_HOST: Joi.string().required(),
				POSTGRES_PORT: Joi.number().required(),
				POSTGRES_USERNAME: Joi.string().required(),
				POSTGRES_PASSWORD: Joi.string().required(),
				POSTGRES_DB: Joi.string().required(),
				SYNCHRONIZE_DB: Joi.boolean(),
				ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
				ACCESS_TOKEN_SECRET: Joi.string().required(),
				AWS_SECRET_ACCESS_KEY: Joi.string().required(),
				AWS_ACCESS_KEY_ID: Joi.string().required(),
				AWS_REGION: Joi.string().required(),
				S3_BUCKET_NAME: Joi.string().required(),
			}),
		}),
		LoggerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					pinoHttp:
						configService.get('NODE_ENV') === 'development'
							? {
									transport: {
										target: 'pino-pretty',
										options: {
											colorize: true,
											levelFirst: true,
											translateTime: true,
										},
									},
									level: 'debug',
							  }
							: {},
				};
			},
		}),
		DatabaseModule,
		UserModule,
	],
	providers: [AppService],
})
export class AppModule {}
