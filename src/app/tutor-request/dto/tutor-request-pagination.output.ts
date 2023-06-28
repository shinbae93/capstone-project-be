import { ObjectType } from '@nestjs/graphql'
import { Pagination } from 'src/base/types/pagination.type'
import { TutorRequest } from 'src/database/entities/tutor-request.entity'

@ObjectType()
export class TutorRequestPagination extends Pagination<TutorRequest>(TutorRequest) {}
