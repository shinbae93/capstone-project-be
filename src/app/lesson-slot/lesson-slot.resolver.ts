import { Resolver } from '@nestjs/graphql';
import { LessonSlotService } from './lesson-slot.service';

@Resolver()
export class LessonSlotResolver {
  constructor(private readonly lessonSlotService: LessonSlotService) {}
}
