import { ObjectType } from '@nestjs/graphql'
import { Pagination } from 'src/base/types/pagination.type'
import { Assignment } from 'src/database/entities/assignment.entity'

@ObjectType()
export class AssignmentPagination extends Pagination<Assignment>(Assignment) {}
