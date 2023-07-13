import { ObjectType } from '@nestjs/graphql'
import { Pagination } from 'src/base/types/pagination.type'
import { TutorDetail } from 'src/database/entities/tutor-detail.entity'

@ObjectType()
export class TutorDetailPagination extends Pagination<TutorDetail>(TutorDetail) {}
