import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddOverduePaymentForEnrolment1688698760460 implements MigrationInterface {
  name = 'AddOverduePaymentForEnrolment1688698760460'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "enrolment" DROP COLUMN "isFinished"`)
    await queryRunner.query(`ALTER TABLE "enrolment" ADD "status" character varying NOT NULL`)
    await queryRunner.query(`ALTER TABLE "enrolment" ADD "startDate" date NOT NULL`)
    await queryRunner.query(`ALTER TABLE "enrolment" ADD "endDate" date NOT NULL`)
    await queryRunner.query(`ALTER TABLE "enrolment" ADD "overduePaymentAt" date NOT NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "enrolment" DROP COLUMN "overduePaymentAt"`)
    await queryRunner.query(`ALTER TABLE "enrolment" DROP COLUMN "endDate"`)
    await queryRunner.query(`ALTER TABLE "enrolment" DROP COLUMN "startDate"`)
    await queryRunner.query(`ALTER TABLE "enrolment" DROP COLUMN "status"`)
    await queryRunner.query(`ALTER TABLE "enrolment" ADD "isFinished" boolean NOT NULL DEFAULT false`)
  }
}
