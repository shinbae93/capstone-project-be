import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ReviewModule } from './review/review.module';
import { OrderModule } from './order/order.module';
import { BrandModule } from './brand/brand.module';
import { OrderItemModule } from './order-item/order-item.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { UserAddressModule } from './user-address/user-address.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { TutorDetailModule } from './tutor-detail/tutor-detail.module';
import { GradeModule } from './grade/grade.module';
import { SubjectModule } from './subject/subject.module';
import { CourseModule } from './course/course.module';
import { ClassModule } from './class/class.module';
import { LessonModule } from './lesson/lesson.module';
import { EnrolmentModule } from './enrolment/enrolment.module';
import { TutorReportModule } from './tutor-report/tutor-report.module';
import { ReviewModule } from './review/review.module';
import { TutorReviewModule } from './tutor-review/tutor-review.module';
import { LessonCommentModule } from './lesson-comment/lesson-comment.module';
import { PaymentModule } from './payment/payment.module';
import { DocumentModule } from './document/document.module';
import { QuizModule } from './quiz/quiz.module';
import { QuizQuestionModule } from './quiz-question/quiz-question.module';
import { QuizQuestionOptionModule } from './quiz-question-option/quiz-question-option.module';
import { QuizUserChoiceModule } from './quiz-user-choice/quiz-user-choice.module';
import { InstallationModule } from './installation/installation.module';
import { NotificationModule } from './notification/notification.module';
import { SubjectMapGradeModule } from './subject-map-grade/subject-map-grade.module';
import { LessonSlotModule } from './lesson_slot/lesson_slot.module';
import { LessonSlotModule } from './lesson-slot/lesson-slot.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    BrandModule,
    CartItemModule,
    CategoryModule,
    CustomerModule,
    UserModule,
    ProductModule,
    ReviewModule,
    OrderModule,
    UserAddressModule,
    OrderItemModule,
    AuthModule,
    RoleModule,
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
    LessonSlotModule,
    TokenModule,
  ],
})
export class AppModule {}
