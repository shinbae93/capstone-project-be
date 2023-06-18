import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeCvColumnName1687091803137 implements MigrationInterface {
  name = 'ChangeCvColumnName1687091803137'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tutor_detail" RENAME COLUMN "cvImage" TO "cv"`)
    await queryRunner.query(`ALTER TABLE "tutor_request" RENAME COLUMN "cvImage" TO "cv"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tutor_request" RENAME COLUMN "cv" TO "cvImage"`)
    await queryRunner.query(`ALTER TABLE "tutor_detail" RENAME COLUMN "cv" TO "cvImage"`)
  }
}
