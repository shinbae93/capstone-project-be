import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EnrolmentService } from './enrolment.service';
import { Enrolment } from '../../database/entities/enrolment.entity';
import { CreateEnrolmentInput } from './dto/create-enrolment.input';
import { UpdateEnrolmentInput } from './dto/update-enrolment.input';

@Resolver(() => Enrolment)
export class EnrolmentResolver {
  constructor(private readonly enrolmentService: EnrolmentService) {}

  @Mutation(() => Enrolment)
  createEnrolment(@Args('createEnrolmentInput') createEnrolmentInput: CreateEnrolmentInput) {
    return this.enrolmentService.create(createEnrolmentInput);
  }

  @Query(() => [Enrolment], { name: 'enrolment' })
  findAll() {
    return this.enrolmentService.findAll();
  }

  @Query(() => Enrolment, { name: 'enrolment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.enrolmentService.findOne(id);
  }

  @Mutation(() => Enrolment)
  updateEnrolment(@Args('updateEnrolmentInput') updateEnrolmentInput: UpdateEnrolmentInput) {
    return this.enrolmentService.update(updateEnrolmentInput.id, updateEnrolmentInput);
  }

  @Mutation(() => Enrolment)
  removeEnrolment(@Args('id', { type: () => Int }) id: number) {
    return this.enrolmentService.remove(id);
  }
}
