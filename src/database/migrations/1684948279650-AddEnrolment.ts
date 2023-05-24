import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddEnrolment1684948279650 implements MigrationInterface {
  name = 'AddEnrolment1684948279650'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "enrolment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "courseId" uuid NOT NULL, "classId" uuid NOT NULL, CONSTRAINT "PK_5d2679f6c891d77c58aa0e05f2b" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "enrolment" ADD CONSTRAINT "FK_23a5e90b5adf89dfdfe4218b982" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "enrolment" ADD CONSTRAINT "FK_32654bfec59f2a78ee4c2d6c9f1" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "enrolment" ADD CONSTRAINT "FK_fac52a1a2bb329f8561ac292f90" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "enrolment" DROP CONSTRAINT "FK_fac52a1a2bb329f8561ac292f90"`)
    await queryRunner.query(`ALTER TABLE "enrolment" DROP CONSTRAINT "FK_32654bfec59f2a78ee4c2d6c9f1"`)
    await queryRunner.query(`ALTER TABLE "enrolment" DROP CONSTRAINT "FK_23a5e90b5adf89dfdfe4218b982"`)
    await queryRunner.query(`DROP TABLE "enrolment"`)
  }
}
