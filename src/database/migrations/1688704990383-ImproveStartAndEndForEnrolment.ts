import { MigrationInterface, QueryRunner } from 'typeorm'

export class ImproveStartAndEndForEnrolment1688704990383 implements MigrationInterface {
  name = 'ImproveStartAndEndForEnrolment1688704990383'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "enrolment" DROP COLUMN "startDate"`)
    await queryRunner.query(`ALTER TABLE "enrolment" DROP COLUMN "endDate"`)
    await queryRunner.query(`ALTER TABLE "enrolment" ADD "startTime" TIMESTAMP NOT NULL`)
    await queryRunner.query(`ALTER TABLE "enrolment" ADD "endTime" TIMESTAMP NOT NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "enrolment" DROP COLUMN "endTime"`)
    await queryRunner.query(`ALTER TABLE "enrolment" DROP COLUMN "startTime"`)
    await queryRunner.query(`ALTER TABLE "enrolment" ADD "endDate" date NOT NULL`)
    await queryRunner.query(`ALTER TABLE "enrolment" ADD "startDate" date NOT NULL`)
  }
}
