import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateSubjectAndGradecolumn1684577099853 implements MigrationInterface {
  name = 'UpdateSubjectAndGradecolumn1684577099853'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "grade" RENAME COLUMN "level" TO "name"`)
    await queryRunner.query(`ALTER TABLE "subject" RENAME COLUMN "level" TO "name"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subject" RENAME COLUMN "name" TO "level"`)
    await queryRunner.query(`ALTER TABLE "grade" RENAME COLUMN "name" TO "level"`)
  }
}
