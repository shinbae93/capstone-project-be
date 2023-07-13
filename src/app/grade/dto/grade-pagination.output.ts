import { ObjectType } from '@nestjs/graphql'
import { Pagination } from 'src/base/types/pagination.type'
import { Grade } from 'src/database/entities/grade.entity'

@ObjectType()
export class GradePagination extends Pagination<Grade>(Grade) {}
