import { Test, TestingModule } from '@nestjs/testing';
import { TutorReportResolver } from './tutor-report.resolver';
import { TutorReportService } from './tutor-report.service';

describe('TutorReportResolver', () => {
  let resolver: TutorReportResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutorReportResolver, TutorReportService],
    }).compile();

    resolver = module.get<TutorReportResolver>(TutorReportResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
