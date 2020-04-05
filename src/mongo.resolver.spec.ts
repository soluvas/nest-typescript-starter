import { Test, TestingModule } from '@nestjs/testing';
import { MongoResolver } from './mongo.resolver';

describe('MongoResolver', () => {
  let resolver: MongoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoResolver],
    }).compile();

    resolver = module.get<MongoResolver>(MongoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
