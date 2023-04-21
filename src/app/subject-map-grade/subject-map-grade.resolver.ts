import { Resolver } from '@nestjs/graphql';
import { SubjectMapGradeService } from './subject-map-grade.service';

@Resolver()
export class SubjectMapGradeResolver {
  constructor(private readonly subjectMapGradeService: SubjectMapGradeService) {}
}
