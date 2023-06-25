import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddCreatedAtEnrolment1687509784264 implements MigrationInterface {
  name = 'AddCreatedAtEnrolment1687509784264'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "enrolment" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "enrolment" DROP COLUMN "createdAt"`)
  }
}
