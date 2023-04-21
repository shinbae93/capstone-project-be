import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TutorReportService } from './tutor-report.service';
import { TutorReport } from '../../database/entities/tutor-report.entity';
import { CreateTutorReportInput } from './dto/create-tutor-report.input';
import { UpdateTutorReportInput } from './dto/update-tutor-report.input';

@Resolver(() => TutorReport)
export class TutorReportResolver {
  constructor(private readonly tutorReportService: TutorReportService) {}

  @Mutation(() => TutorReport)
  createTutorReport(@Args('createTutorReportInput') createTutorReportInput: CreateTutorReportInput) {
    return this.tutorReportService.create(createTutorReportInput);
  }

  @Query(() => [TutorReport], { name: 'tutorReport' })
  findAll() {
    return this.tutorReportService.findAll();
  }

  @Query(() => TutorReport, { name: 'tutorReport' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tutorReportService.findOne(id);
  }

  @Mutation(() => TutorReport)
  updateTutorReport(@Args('updateTutorReportInput') updateTutorReportInput: UpdateTutorReportInput) {
    return this.tutorReportService.update(updateTutorReportInput.id, updateTutorReportInput);
  }

  @Mutation(() => TutorReport)
  removeTutorReport(@Args('id', { type: () => Int }) id: number) {
    return this.tutorReportService.remove(id);
  }
}
