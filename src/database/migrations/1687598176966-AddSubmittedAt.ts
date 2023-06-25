import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddSubmittedAt1687598176966 implements MigrationInterface {
  name = 'AddSubmittedAt1687598176966'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "assignment" ADD "submittedAt" TIMESTAMP`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "assignment" DROP COLUMN "submittedAt"`)
  }
}
