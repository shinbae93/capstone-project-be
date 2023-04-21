import { CreateTutorReportInput } from './create-tutor-report.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTutorReportInput extends PartialType(CreateTutorReportInput) {
  @Field(() => Int)
  id: number;
}
