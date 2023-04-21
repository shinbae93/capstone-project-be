import { Test, TestingModule } from '@nestjs/testing';
import { TutorReportService } from './tutor-report.service';

describe('TutorReportService', () => {
  let service: TutorReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutorReportService],
    }).compile();

    service = module.get<TutorReportService>(TutorReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
