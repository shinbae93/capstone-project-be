import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { Calendar } from 'src/database/entities/calendar.entity'
import { Class } from 'src/database/entities/class.entity'
import { Course } from 'src/database/entities/course.entity'
import { convertLessonTimeToString, convertScheduleListToMap } from 'src/utils/schedule'
import { FindOptionsWhere, Repository } from 'typeorm'
import { CalendarQueryParams } from './dto/get-calendar.input'

@Injectable()
export class CalendarService {
  constructor(@InjectRepository(Calendar) private calendarRepository: Repository<Calendar>) {}

  findAll(queryParams: CalendarQueryParams) {
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

    return queryBuilder.getMany()
  }

  findOne(id: string) {
    return this.calendarRepository.findOneBy({ id })
  }

  async createManyByClass(course: Course, classEntity: Class, userId: string, isTeaching = false) {
    const { startDate, endDate } = course
    const { schedule } = classEntity
    const scheduleMap = convertScheduleListToMap(schedule)
    const listCalendar = []
    const date = moment(startDate)
    const end = moment(endDate)

    while (date.isSameOrBefore(end, 'day')) {
      const day = scheduleMap.get(date.day())
      if (day) {
        listCalendar.push(
          this.calendarRepository.create({
            courseName: course.name,
            className: classEntity.name,
            method: classEntity.method,
            status: course.status,
            date: date.toDate(),
            startTime: convertLessonTimeToString(day.startTime),
            endTime: convertLessonTimeToString(day.endTime),
            isTeaching,
            courseId: course.id,
            classId: classEntity.id,
            userId,
          })
        )
      }
      date.add(1, 'day')
    }

    await this.calendarRepository.insert(listCalendar)
  }

  async delete(criteria: FindOptionsWhere<Calendar>) {
    return this.calendarRepository.delete(criteria)
  }
}
