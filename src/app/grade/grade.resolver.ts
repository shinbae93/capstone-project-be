import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { GradeService } from './grade.service'
import { Grade } from '../../database/entities/grade.entity'
import { CreateGradeInput } from './dto/create-grade.input'
import { UpdateGradeInput } from './dto/update-grade.input'

@Resolver(() => Grade)
export class GradeResolver {
  constructor(private readonly gradeService: GradeService) {}

  @Mutation(() => Grade)
  createGrade(@Args('input') createGradeInput: CreateGradeInput) {
    return this.gradeService.create(createGradeInput)
  }

  @Query(() => [Grade], { name: 'grades' })
  findAll() {
    return this.gradeService.findAll()
  }

  @Query(() => Grade, { name: 'grade' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.gradeService.findOne({ id })
  }

  @Mutation(() => Grade)
  updateGrade(@Args('input') updateGradeInput: UpdateGradeInput) {
    return this.gradeService.update(updateGradeInput.id, updateGradeInput)
  }

  @Mutation(() => Grade)
  removeGrade(@Args('id', { type: () => ID }) id: string) {
    return this.gradeService.remove(id)
  }
}
