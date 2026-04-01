import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from './exercise.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private exRepo: Repository<Exercise>,
  ) {}

  findAll(): Promise<Exercise[]> {
    return this.exRepo.find();
  }

  findById(id: number): Promise<Exercise | null> {
    return this.exRepo.findOneBy({ id });
  }

  async create(exData: Partial<Exercise>): Promise<Exercise> {
    const newEx = this.exRepo.create(exData);
    return await this.exRepo.save(newEx);
  }

  async update(updEx: Exercise): Promise<Exercise | null> {
    const exDb = await this.exRepo.findOneBy({ id: updEx.id });
    if (!exDb) throw new NotFoundException();
    exDb.name = updEx.name;
    await this.exRepo.save(exDb);
    return exDb;
  }

  remove(id: number) {
    return this.exRepo.delete(id);
  }
}
