import { Test, TestingModule } from '@nestjs/testing';
import { SubjectMapGradeService } from './subject-map-grade.service';

describe('SubjectMapGradeService', () => {
  let service: SubjectMapGradeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubjectMapGradeService],
    }).compile();

    service = module.get<SubjectMapGradeService>(SubjectMapGradeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
