import { Injectable, Scope } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as DataLoader from 'dataloader'
import { Course } from 'src/database/entities/course.entity'
import { In, Repository } from 'typeorm'

@Injectable({ scope: Scope.REQUEST })
export class ClassLoader {
  constructor(@InjectRepository(Course) private courseRepository: Repository<Course>) {}

  public readonly batchCourses = new DataLoader(async (courseIds: string[]) => {
    const courses = await this.courseRepository.findBy({ id: In(courseIds) })
    const coursesMap = new Map(courses.map((item) => [item.id, item]))
    return courseIds.map((courseId) => coursesMap.get(courseId))
  })
}
