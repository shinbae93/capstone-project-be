import { CreateLessonCommentInput } from './create-lesson-comment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLessonCommentInput extends PartialType(CreateLessonCommentInput) {
  @Field(() => Int)
  id: number;
}
