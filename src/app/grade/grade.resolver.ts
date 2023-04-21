import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GradeService } from './grade.service';
import { Grade } from '../../database/entities/grade.entity';
import { CreateGradeInput } from './dto/create-grade.input';
import { UpdateGradeInput } from './dto/update-grade.input';

@Resolver(() => Grade)
export class GradeResolver {
  constructor(private readonly gradeService: GradeService) {}

  @Mutation(() => Grade)
  createGrade(@Args('createGradeInput') createGradeInput: CreateGradeInput) {
    return this.gradeService.create(createGradeInput);
  }

  @Query(() => [Grade], { name: 'grade' })
  findAll() {
    return this.gradeService.findAll();
  }

  @Query(() => Grade, { name: 'grade' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.gradeService.findOne(id);
  }

  @Mutation(() => Grade)
  updateGrade(@Args('updateGradeInput') updateGradeInput: UpdateGradeInput) {
    return this.gradeService.update(updateGradeInput.id, updateGradeInput);
  }

  @Mutation(() => Grade)
  removeGrade(@Args('id', { type: () => Int }) id: number) {
    return this.gradeService.remove(id);
  }
}
