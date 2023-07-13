import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddTutorRating1689059005830 implements MigrationInterface {
  name = 'AddTutorRating1689059005830'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tutor_detail" ADD "rating" integer`)
    await queryRunner.query(`ALTER TABLE "payment" ADD "enrolmentId" character varying`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "enrolmentId"`)
    await queryRunner.query(`ALTER TABLE "tutor_detail" DROP COLUMN "rating"`)
  }
}
