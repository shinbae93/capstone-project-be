import { ObjectType } from '@nestjs/graphql'
import { Pagination } from 'src/base/types/pagination.type'
import { Course } from 'src/database/entities/course.entity'

@ObjectType()
export class CoursesPagination extends Pagination<Course>(Course) {}
