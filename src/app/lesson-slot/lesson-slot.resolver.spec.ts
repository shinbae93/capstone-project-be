import { Test, TestingModule } from '@nestjs/testing';
import { LessonSlotResolver } from './lesson-slot.resolver';
import { LessonSlotService } from './lesson-slot.service';

describe('LessonSlotResolver', () => {
  let resolver: LessonSlotResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonSlotResolver, LessonSlotService],
    }).compile();

    resolver = module.get<LessonSlotResolver>(LessonSlotResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
