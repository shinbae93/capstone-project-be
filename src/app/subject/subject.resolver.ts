import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Subject } from '../../database/entities/subject.entity'
import { CreateSubjectInput } from './dto/create-subject.input'
import { UpdateSubjectInput } from './dto/update-subject.input'
import { SubjectService } from './subject.service'
import { SubjectPagination } from './dto/subject-pagination.output'
import { QueryParams } from 'src/base/types/query-params.type'

@Resolver(() => Subject)
export class SubjectResolver {
  constructor(private readonly subjectService: SubjectService) {}

  @Mutation(() => Subject)
  createSubject(@Args('input') createSubjectInput: CreateSubjectInput) {
    return this.subjectService.create(createSubjectInput)
  }

  @Query(() => SubjectPagination, { name: 'subjects' })
  findAll(@Args('queryParams') queryParams: QueryParams) {
    return this.subjectService.findAll(queryParams)
  }

  @Query(() => Subject, { name: 'subject' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.subjectService.findOne({ id })
  }

  @Mutation(() => Subject)
  updateSubject(@Args('input') updateSubjectInput: UpdateSubjectInput) {
    return this.subjectService.update(updateSubjectInput.id, updateSubjectInput)
  }

  @Mutation(() => Boolean)
  removeSubject(@Args('id', { type: () => ID }) id: string) {
    return this.subjectService.remove(id)
  }
}
