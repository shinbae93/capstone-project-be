import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { Calendar } from 'src/database/entities/calendar.entity'
import { Class } from 'src/database/entities/class.entity'
import { Course } from 'src/database/entities/course.entity'
import { User } from 'src/database/entities/user.entity'
import { FindOptionsWhere, Repository } from 'typeorm'
import { CalendarQueryParams } from './dto/calendar-query-params.input'
import { groupBy } from 'lodash'

@Injectable()
export class CalendarService {
  constructor(@InjectRepository(Calendar) private calendarRepository: Repository<Calendar>) {}

  findAll(queryParams: CalendarQueryParams, currentUser?: User) {
    const queryBuilder = this.calendarRepository.createQueryBuilder()
    if (queryParams) {
      const { startTime, endTime, courseId } = queryParams
      if (startTime) {
        queryBuilder.where(`"Calendar"."date" >= :startTime`, { startTime })
      }
      if (endTime) {
        queryBuilder.andWhere(`"Calendar"."date" <= :endTime`, { endTime })
      }
      if (courseId) {
        queryBuilder.andWhere({ courseId })
      }
    }

    if (currentUser) {
      queryBuilder.andWhere(`"Calendar"."userId" = :userId`, { userId: currentUser.id })
    }

    return queryBuilder.getMany()
  }

  findOne(id: string) {
    return this.calendarRepository.findOneBy({ id })
  }

  async createManyByClass(course: Course, classEntity: Class, userId: string, tutor?: User) {
    const { schedule, startDate, endDate } = classEntity
    const scheduleMap = groupBy(schedule, 'dayOfWeek')
    const listCalendar = []
    const date = moment(startDate)
    const end = moment(endDate)

    while (date.isSameOrBefore(end)) {
      const scheduleList = scheduleMap[date.day()]
      if (scheduleList?.length) {
        for (const item of scheduleList) {
          const calendar = this.calendarRepository.create({
            courseName: course.name,
            className: classEntity.name,
            method: classEntity.method,
            status: course.status,
            date: date.toDate(),
            startTime: item.startTime,
            endTime: item.endTime,
            courseId: course.id,
            classId: classEntity.id,
            userId,
          })

          if (tutor) {
            calendar.tutorName = tutor.fullName
            calendar.tutorId = tutor.id
          }

          listCalendar.push(calendar)
        }
      }

      date.add(1, 'day')
    }

    await this.calendarRepository.insert(listCalendar)
  }

  async delete(criteria: FindOptionsWhere<Calendar>) {
    return this.calendarRepository.delete(criteria)
  }
}
