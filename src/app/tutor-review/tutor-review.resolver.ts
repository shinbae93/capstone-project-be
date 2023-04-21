import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TutorReviewService } from './tutor-review.service';
import { TutorReview } from '../../database/entities/tutor-review.entity';
import { CreateTutorReviewInput } from './dto/create-tutor-review.input';
import { UpdateTutorReviewInput } from './dto/update-tutor-review.input';

@Resolver(() => TutorReview)
export class TutorReviewResolver {
  constructor(private readonly tutorReviewService: TutorReviewService) {}

  @Mutation(() => TutorReview)
  createTutorReview(@Args('createTutorReviewInput') createTutorReviewInput: CreateTutorReviewInput) {
    return this.tutorReviewService.create(createTutorReviewInput);
  }

  @Query(() => [TutorReview], { name: 'tutorReview' })
  findAll() {
    return this.tutorReviewService.findAll();
  }

  @Query(() => TutorReview, { name: 'tutorReview' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tutorReviewService.findOne(id);
  }

  @Mutation(() => TutorReview)
  updateTutorReview(@Args('updateTutorReviewInput') updateTutorReviewInput: UpdateTutorReviewInput) {
    return this.tutorReviewService.update(updateTutorReviewInput.id, updateTutorReviewInput);
  }

  @Mutation(() => TutorReview)
  removeTutorReview(@Args('id', { type: () => Int }) id: number) {
    return this.tutorReviewService.remove(id);
  }
}
