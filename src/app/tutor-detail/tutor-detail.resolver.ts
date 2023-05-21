import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { TutorDetailService } from './tutor-detail.service'
import { TutorDetail } from '../../database/entities/tutor-detail.entity'
import { UpdateTutorDetailInput } from './dto/update-tutor-detail.input'

@Resolver(() => TutorDetail)
export class TutorDetailResolver {
  constructor(private readonly tutorDetailService: TutorDetailService) {}

  @Query(() => TutorDetail, { name: 'tutorDetail' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.tutorDetailService.findOne({ id })
  }

  @Mutation(() => TutorDetail)
  updateTutorDetail(@Args('input') updateTutorDetailInput: UpdateTutorDetailInput) {
    return this.tutorDetailService.update(updateTutorDetailInput.id, updateTutorDetailInput)
  }
}
