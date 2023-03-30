import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        uri: configService.get<string>('DB_URI'),
        models: ['./entities'],
        autoLoadModels: true,
        logging: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
