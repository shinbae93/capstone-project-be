import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { paginate } from 'nestjs-typeorm-paginate'
import { TutorReport } from 'src/database/entities/tutor-report.entity'
import { applySorting } from 'src/utils/query-builder'
import { Repository } from 'typeorm'
import { CreateTutorReportInput } from './dto/create-tutor-report.input'
import { TutorReportQueryParams } from './dto/tutor-report-query-params.input'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { TutorReportStatus } from 'src/common/enums'
import { Enrolment } from 'src/database/entities/enrolment.entity'

@Injectable()
export class TutorReportService {
  constructor(
    @InjectRepository(TutorReport) private tutorReportRepository: Repository<TutorReport>,
    @InjectRepository(Enrolment) private enrolmentRepository: Repository<Enrolment>
  ) {}

  async create(input: CreateTutorReportInput, currentUserId: string) {
    const enrolment = await this.enrolmentRepository.findOneBy({
      classId: input.classId,
      courseId: input.courseId,
      userId: currentUserId,
    })
    if (!enrolment) {
      throw new BadRequestException(ERROR_MESSAGE.YOU_HAVE_NOT_BEEN_STUDENT_OF_THIS_TUTOR_BEFORE)
    }

    return this.tutorReportRepository.save(
      this.tutorReportRepository.create({
        ...input,
        authorId: currentUserId,
        status: TutorReportStatus.PENDING,
      })
    )
  }

  findAll(queryParams: TutorReportQueryParams) {
    const { sorting, pagination } = queryParams

    const queryBuilder = this.tutorReportRepository.createQueryBuilder()

    if (queryParams.filters) {
      const { tutorId } = queryParams.filters

      if (tutorId) {
        queryBuilder.andWhere(`"TutorReview"."tutorId" = :tutorId`, { tutorId })
      }
    }

    if (sorting) {
      applySorting(queryBuilder, sorting)
    }

    return paginate(queryBuilder, pagination)
  }

  async findOne(id: string) {
    const tutorReport = await this.tutorReportRepository.findOneBy({ id })
    if (!tutorReport) {
      throw new BadRequestException(ERROR_MESSAGE.TUTOR_REPORT_NOT_FOUND)
    }

    return tutorReport
  }
}
