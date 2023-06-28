import { InputType } from '@nestjs/graphql'
import { QueryParams } from 'src/base/types/query-params.type'

@InputType()
export class TutorRequestQueryParams extends QueryParams {}
