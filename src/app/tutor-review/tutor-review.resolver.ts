import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { TutorReviewService } from './tutor-review.service'
import { TutorReview } from '../../database/entities/tutor-review.entity'
import { CreateTutorReviewInput } from './dto/create-tutor-review.input'
import { UpdateTutorReviewInput } from './dto/update-tutor-review.input'
import { CurrentUser } from 'src/decorator/current-user.decorator'
import { User } from 'src/database/entities/user.entity'

@Resolver(() => TutorReview)
export class TutorReviewResolver {
  constructor(private readonly tutorReviewService: TutorReviewService) {}

  @Mutation(() => TutorReview)
  createTutorReview(
    @Args('input') createTutorReviewInput: CreateTutorReviewInput,
    @CurrentUser() user: User
  ) {
    return this.tutorReviewService.create(createTutorReviewInput, user.id)
  }

  @Query(() => [TutorReview], { name: 'tutorReviews' })
  findAll() {
    return this.tutorReviewService.findAll()
  }

  @Query(() => TutorReview, { name: 'tutorReview' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.tutorReviewService.findOne({ id })
  }

  @Mutation(() => TutorReview)
  updateTutorReview(
    @Args('input') updateTutorReviewInput: UpdateTutorReviewInput
  ) {
    return this.tutorReviewService.update(updateTutorReviewInput.id, updateTutorReviewInput)
  }

  @Mutation(() => Boolean)
  removeTutorReview(@Args('id', { type: () => ID }) id: string) {
    return this.tutorReviewService.remove(id)
  }
}
