import { ObjectType } from '@nestjs/graphql'
import { Pagination } from 'src/base/types/pagination.type'
import { TutorReport } from 'src/database/entities/tutor-report.entity'

@ObjectType()
export class TutorReportPagination extends Pagination<TutorReport>(TutorReport) {}
