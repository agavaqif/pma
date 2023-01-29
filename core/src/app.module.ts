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
import { MqStepModule } from './resources/mq-step/mq-step.module';
import { IsCompletedModule } from './resources/is-completed/is-completed.module';
import { StepNoteModule } from './resources/step-note/step-note.module';

console.log(process.env.NODE_ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV == 'dev' ? `${process.cwd()}/env/${process.env.NODE_ENV}.env` : `${process.cwd()}/env/prod.env`,
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
    MqStepModule,
    IsCompletedModule,
    StepNoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
