import { Test, TestingModule } from '@nestjs/testing';
import { TutorDetailResolver } from './tutor-detail.resolver';
import { TutorDetailService } from './tutor-detail.service';

describe('TutorDetailResolver', () => {
  let resolver: TutorDetailResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutorDetailResolver, TutorDetailService],
    }).compile();

    resolver = module.get<TutorDetailResolver>(TutorDetailResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
