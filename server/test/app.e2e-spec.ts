import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { cleanDatabase } from './db-utils';
import { DataSource } from 'typeorm';
import { seedDatabase } from './seeder';

describe('ExerciseController (e2e)', () => {
  let app: INestApplication<App>;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dataSource = app.get(DataSource);
  });

  beforeEach(async () => {
    await cleanDatabase(dataSource);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/exercises')
      .expect(200)
      .expect([]);
  });

  it('/ (GET) seeded', async () => {
    const { testEx } = await seedDatabase(dataSource);

    return request(app.getHttpServer())
      .get('/api/exercises')
      .expect(200)
      .expect((res) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(res.body.length === 1);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(res.body[0].name === testEx.name);
      });
  });

  it('/ (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/exercises')
      .send({ name: 'bench press' });
    expect(res.status).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(res.body.id).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(res.body.name).toEqual('bench press');
  });

  it('/ (PUT)', async () => {
    const { testEx } = await seedDatabase(dataSource);

    const res = await request(app.getHttpServer())
      .put(`/api/exercises/${testEx.id}`)
      .send({ name: 'updated name' });
    expect(res.status).toBe(200);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(res.body?.name).toBe('updated name');
  });

  it('/ (DELETE)', async () => {
    const { testEx } = await seedDatabase(dataSource);

    const res = await request(app.getHttpServer()).delete(
      `/api/exercises/${testEx.id}`,
    );
    expect(res.status).toBe(200);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(res.body.affected).toBe(1);

    const all = await request(app.getHttpServer()).get('/api/exercises');
    expect(all.status).toBe(200);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(all.body.length).toBe(0);
  });

  afterAll(async () => {
    await app.close();
  });
});
