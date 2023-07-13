import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { User } from 'src/database/entities/user.entity'
import { CurrentUser } from 'src/decorators/current-user.decorator'
import { TutorReport } from '../../database/entities/tutor-report.entity'
import { CreateTutorReportInput } from './dto/create-tutor-report.input'
import { TutorReportPagination } from './dto/tutor-report-pagination.output'
import { TutorReportQueryParams } from './dto/tutor-report-query-params.input'
import { TutorReportService } from './tutor-report.service'
import { TutorReportLoader } from './tutor-report.loader'

@Resolver(() => TutorReport)
export class TutorReportResolver {
  constructor(
    private readonly tutorReportService: TutorReportService,
    private readonly tutorReportLoader: TutorReportLoader
  ) {}

  @Mutation(() => TutorReport, { name: 'createTutorReport' })
  createTutorReport(@Args('input') createTutorReportInput: CreateTutorReportInput, @CurrentUser() currentUser: User) {
    return this.tutorReportService.create(createTutorReportInput, currentUser.id)
  }

  @Query(() => TutorReportPagination, { name: 'tutorReports' })
  findAll(@Args('queryParams') queryParams: TutorReportQueryParams) {
    return this.tutorReportService.findAll(queryParams)
  }

  @Query(() => TutorReport, { name: 'tutorReport' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.tutorReportService.findOne(id)
  }

  @ResolveField('tutor', () => User)
  async getTutor(@Parent() tutorReport: TutorReport) {
    return this.tutorReportLoader.batchTutors.load(tutorReport.tutorId)
  }

  @ResolveField('author', () => User)
  async getAuthor(@Parent() tutorReport: TutorReport) {
    return this.tutorReportLoader.batchAuthors.load(tutorReport.authorId)
  }
}
