import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { typeOrmModule } from './db';
import { ExercisesModule } from './exercises/exercises.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      cache: true,
    }),
    typeOrmModule,
    ExercisesModule,
  ],
})
export class AppModule {}
