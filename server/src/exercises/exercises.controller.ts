import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import type { CreateExerciseDto } from './dto/create-exercise.dto';
import { Exercise } from './exercise.entity';

@Controller('api/exercises')
export class ExercisesController {
  constructor(private exService: ExercisesService) {}

  @Get()
  findAll() {
    return this.exService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.exService.findById(id);
  }

  @Post()
  create(@Body() newEx: CreateExerciseDto) {
    return this.exService.create(newEx);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updEx: Exercise) {
    return this.exService.update(updEx);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.exService.remove(id);
  }
}
