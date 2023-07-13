import { ObjectType } from '@nestjs/graphql'
import { Pagination } from 'src/base/types/pagination.type'
import { TutorReview } from 'src/database/entities/tutor-review.entity'

@ObjectType()
export class TutorReviewPagination extends Pagination<TutorReview>(TutorReview) {}
