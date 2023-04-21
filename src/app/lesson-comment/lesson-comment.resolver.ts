import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LessonCommentService } from './lesson-comment.service';
import { LessonComment } from '../../database/entities/lesson-comment.entity';
import { CreateLessonCommentInput } from './dto/create-lesson-comment.input';
import { UpdateLessonCommentInput } from './dto/update-lesson-comment.input';

@Resolver(() => LessonComment)
export class LessonCommentResolver {
  constructor(private readonly lessonCommentService: LessonCommentService) {}

  @Mutation(() => LessonComment)
  createLessonComment(@Args('createLessonCommentInput') createLessonCommentInput: CreateLessonCommentInput) {
    return this.lessonCommentService.create(createLessonCommentInput);
  }

  @Query(() => [LessonComment], { name: 'lessonComment' })
  findAll() {
    return this.lessonCommentService.findAll();
  }

  @Query(() => LessonComment, { name: 'lessonComment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.lessonCommentService.findOne(id);
  }

  @Mutation(() => LessonComment)
  updateLessonComment(@Args('updateLessonCommentInput') updateLessonCommentInput: UpdateLessonCommentInput) {
    return this.lessonCommentService.update(updateLessonCommentInput.id, updateLessonCommentInput);
  }

  @Mutation(() => LessonComment)
  removeLessonComment(@Args('id', { type: () => Int }) id: number) {
    return this.lessonCommentService.remove(id);
  }
}
