import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.createApplicationContext(AppModule, {
		bufferLogs: true,
	});
	app.useLogger(app.get(Logger));
}

bootstrap();
