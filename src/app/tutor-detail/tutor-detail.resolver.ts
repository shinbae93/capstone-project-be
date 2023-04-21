import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TutorDetailService } from './tutor-detail.service';
import { TutorDetail } from '../../database/entities/tutor-detail.entity';
import { CreateTutorDetailInput } from './dto/create-tutor-detail.input';
import { UpdateTutorDetailInput } from './dto/update-tutor-detail.input';

@Resolver(() => TutorDetail)
export class TutorDetailResolver {
  constructor(private readonly tutorDetailService: TutorDetailService) {}

  @Mutation(() => TutorDetail)
  createTutorDetail(@Args('createTutorDetailInput') createTutorDetailInput: CreateTutorDetailInput) {
    return this.tutorDetailService.create(createTutorDetailInput);
  }

  @Query(() => [TutorDetail], { name: 'tutorDetail' })
  findAll() {
    return this.tutorDetailService.findAll();
  }

  @Query(() => TutorDetail, { name: 'tutorDetail' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tutorDetailService.findOne(id);
  }

  @Mutation(() => TutorDetail)
  updateTutorDetail(@Args('updateTutorDetailInput') updateTutorDetailInput: UpdateTutorDetailInput) {
    return this.tutorDetailService.update(updateTutorDetailInput.id, updateTutorDetailInput);
  }

  @Mutation(() => TutorDetail)
  removeTutorDetail(@Args('id', { type: () => Int }) id: number) {
    return this.tutorDetailService.remove(id);
  }
}
