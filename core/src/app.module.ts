import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './core/core.module';
import { ProjectModule } from './resources/project/project.module';
import { KpModule } from './resources/kp/kp.module';
import { ExecTypeModule } from './resources/exec-type/exec-type.module';
import { MqModule } from './resources/mq/mq.module';
import { CrewModule } from './resources/crew/crew.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: false,
      }),
    }),
    CoreModule,
    ProjectModule,
    KpModule,
    ExecTypeModule,
    MqModule,
    CrewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
