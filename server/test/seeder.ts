import { DataSource } from 'typeorm';
import { Exercise } from '../src/exercises/exercise.entity';

export async function seedDatabase(dataSource: DataSource) {
  const exRepo = dataSource.getRepository(Exercise);

  await exRepo.query('TRUNCATE "exercise" RESTART IDENTITY CASCADE');

  const testEx = exRepo.create({
    name: 'bench press',
  });

  await exRepo.save(testEx);

  return { testEx };
}
