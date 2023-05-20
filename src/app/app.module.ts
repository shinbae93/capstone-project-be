import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import * as Joi from 'joi'
import { DatabaseModule } from 'src/database/database.module'
import { JwtAuthGuard } from 'src/guard/auth.guard'
import { RoleGuard } from 'src/guard/role.guard'
import { AuthModule } from './auth/auth.module'
import { ClassModule } from './class/class.module'
import { CourseModule } from './course/course.module'
import { DocumentModule } from './document/document.module'
import { EnrolmentModule } from './enrolment/enrolment.module'
import { GradeModule } from './grade/grade.module'
import { InstallationModule } from './installation/installation.module'
import { LessonCommentModule } from './lesson-comment/lesson-comment.module'
import { LessonModule } from './lesson/lesson.module'
import { NotificationModule } from './notification/notification.module'
import { PaymentModule } from './payment/payment.module'
import { QuizQuestionOptionModule } from './quiz-question-option/quiz-question-option.module'
import { QuizQuestionModule } from './quiz-question/quiz-question.module'
import { QuizUserChoiceModule } from './quiz-user-choice/quiz-user-choice.module'
import { QuizModule } from './quiz/quiz.module'
import { SubjectMapGradeModule } from './subject-map-grade/subject-map-grade.module'
import { SubjectModule } from './subject/subject.module'
import { TutorDetailModule } from './tutor-detail/tutor-detail.module'
import { TutorReportModule } from './tutor-report/tutor-report.module'
import { TutorRequestModule } from './tutor-request/tutor-request.module'
import { TutorReviewModule } from './tutor-review/tutor-review.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.number().required(),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    AuthModule,
    DatabaseModule,
    UserModule,
    TutorDetailModule,
    GradeModule,
    SubjectModule,
    CourseModule,
    ClassModule,
    LessonModule,
    EnrolmentModule,
    TutorReportModule,
    TutorReviewModule,
    LessonCommentModule,
    PaymentModule,
    DocumentModule,
    QuizModule,
    QuizQuestionModule,
    QuizQuestionOptionModule,
    QuizUserChoiceModule,
    InstallationModule,
    NotificationModule,
    SubjectMapGradeModule,
    TutorRequestModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
