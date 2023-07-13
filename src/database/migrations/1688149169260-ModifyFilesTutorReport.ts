import { MigrationInterface, QueryRunner } from 'typeorm'

export class ModifyFilesTutorReport1688149169260 implements MigrationInterface {
  name = 'ModifyFilesTutorReport1688149169260'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tutor_report" RENAME COLUMN "images" TO "files"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tutor_report" RENAME COLUMN "files" TO "images"`)
  }
}
