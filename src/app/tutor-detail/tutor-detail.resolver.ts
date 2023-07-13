import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { User } from 'src/database/entities/user.entity'
import { TutorDetail } from '../../database/entities/tutor-detail.entity'
import { TutorDetailPagination } from './dto/tutor-detail-pagination.output'
import { TutorDetailQueryParams } from './dto/tutor-detail-query-params.input'
import { UpdateTutorDetailInput } from './dto/update-tutor-detail.input'
import { TutorDetailLoader } from './tutor-detail.loader'
import { TutorDetailService } from './tutor-detail.service'

@Resolver(() => TutorDetail)
export class TutorDetailResolver {
  constructor(
    private readonly tutorDetailService: TutorDetailService,
    private readonly tutorDetailLoader: TutorDetailLoader
  ) {}

  @Query(() => TutorDetailPagination, { name: 'tutorDetails' })
  findAll(@Args('queryParams') queryParams: TutorDetailQueryParams) {
    return this.tutorDetailService.findAll(queryParams)
  }

  @Query(() => TutorDetail, { name: 'tutorDetail' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.tutorDetailService.findOne({ id })
  }

  @Mutation(() => TutorDetail)
  updateTutorDetail(@Args('input') updateTutorDetailInput: UpdateTutorDetailInput) {
    return this.tutorDetailService.update(updateTutorDetailInput.id, updateTutorDetailInput)
  }

  @ResolveField('user', () => User)
  async getUser(@Parent() tutorDetail: TutorDetail) {
    return this.tutorDetailLoader.batchUsers.load(tutorDetail.userId)
  }

  @ResolveField('totalReviews', () => Int)
  async getTotalReviews(@Parent() tutorDetail: TutorDetail) {
    return this.tutorDetailService.getTotalReviews(tutorDetail.userId)
  }
}
