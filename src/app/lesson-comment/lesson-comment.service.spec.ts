import { Test, TestingModule } from '@nestjs/testing';
import { LessonCommentService } from './lesson-comment.service';

describe('LessonCommentService', () => {
  let service: LessonCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonCommentService],
    }).compile();

    service = module.get<LessonCommentService>(LessonCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
