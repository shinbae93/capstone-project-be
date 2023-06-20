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
    const builder = this.calendarRepository.createQueryBuilder()
    if (queryParams) {
      const { startTime, endTime, courseId } = queryParams
      if (startTime) {
        builder.where(`"Calendar"."date" >= :startTime`, { startTime })
      }
      if (endTime) {
        builder.andWhere(`"Calendar"."date" <= :endTime`, { endTime })
      }
      if (courseId) {
        builder.andWhere({ courseId })
      }
    }

    return builder.getMany()
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
