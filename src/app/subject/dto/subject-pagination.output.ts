import { ObjectType } from '@nestjs/graphql'
import { Pagination } from 'src/base/types/pagination.type'
import { Subject } from 'src/database/entities/subject.entity'

@ObjectType()
export class SubjectPagination extends Pagination<Subject>(Subject) {}
