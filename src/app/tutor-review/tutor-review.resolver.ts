import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { User } from 'src/database/entities/user.entity'
import { CurrentUser } from 'src/decorators/current-user.decorator'
import { TutorReview } from '../../database/entities/tutor-review.entity'
import { CreateTutorReviewInput } from './dto/create-tutor-review.input'
import { TutorReviewPagination } from './dto/tutor-review-pagination.output'
import { TutorReviewQueryParams } from './dto/tutor-review-query-params.input'
import { UpdateTutorReviewInput } from './dto/update-tutor-review.input'
import { TutorReviewLoader } from './tutor-review.loader'
import { TutorReviewService } from './tutor-review.service'

@Resolver(() => TutorReview)
export class TutorReviewResolver {
  constructor(
    private readonly tutorReviewService: TutorReviewService,
    private readonly tutorReviewLoader: TutorReviewLoader
  ) {}

  @Mutation(() => TutorReview)
  createTutorReview(@Args('input') createTutorReviewInput: CreateTutorReviewInput, @CurrentUser() user: User) {
    return this.tutorReviewService.create(createTutorReviewInput, user.id)
  }

  @Query(() => TutorReviewPagination, { name: 'tutorReviews' })
  findAll(@Args('queryParams') queryParams: TutorReviewQueryParams) {
    return this.tutorReviewService.findAll(queryParams)
  }

  @Query(() => TutorReview, { name: 'tutorReview' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.tutorReviewService.findOne({ id })
  }

  @Mutation(() => TutorReview)
  updateTutorReview(@Args('input') updateTutorReviewInput: UpdateTutorReviewInput) {
    return this.tutorReviewService.update(updateTutorReviewInput.id, updateTutorReviewInput)
  }

  @Mutation(() => Boolean)
  removeTutorReview(@Args('id', { type: () => ID }) id: string) {
    return this.tutorReviewService.remove(id)
  }

  @ResolveField('author', () => User)
  async getUser(@Parent() tutorReview: TutorReview) {
    return this.tutorReviewLoader.batchUsers.load(tutorReview.authorId)
  }
}
