import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { GradeService } from './grade.service'
import { Grade } from '../../database/entities/grade.entity'
import { CreateGradeInput } from './dto/create-grade.input'
import { UpdateGradeInput } from './dto/update-grade.input'
import { GradePagination } from './dto/grade-pagination.output'
import { QueryParams } from 'src/base/types/query-params.type'

@Resolver(() => Grade)
export class GradeResolver {
  constructor(private readonly gradeService: GradeService) {}

  @Mutation(() => Grade)
  createGrade(@Args('input') createGradeInput: CreateGradeInput) {
    return this.gradeService.create(createGradeInput)
  }

  @Query(() => GradePagination, { name: 'grades' })
  findAll(@Args('queryParams') queryParams: QueryParams) {
    return this.gradeService.findAll(queryParams)
  }

  @Query(() => Grade, { name: 'grade' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.gradeService.findOne({ id })
  }

  @Mutation(() => Grade)
  updateGrade(@Args('input') updateGradeInput: UpdateGradeInput) {
    return this.gradeService.update(updateGradeInput.id, updateGradeInput)
  }

  @Mutation(() => Boolean)
  removeGrade(@Args('id', { type: () => ID }) id: string) {
    return this.gradeService.remove(id)
  }
}
