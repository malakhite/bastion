import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				url: configService.get('DATABASE_URL'),
				synchronize: Boolean(configService.get('SYNCHRONIZE_DB')),
				autoLoadEntities: true,
			}),
		}),
	],
})
export class DatabaseModule {}
