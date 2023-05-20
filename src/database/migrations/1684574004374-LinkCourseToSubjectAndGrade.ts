import { MigrationInterface, QueryRunner } from 'typeorm'

export class LinkCourseToSubjectAndGrade1684574004374 implements MigrationInterface {
  name = 'LinkCourseToSubjectAndGrade1684574004374'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "course" ADD "gradeId" uuid NOT NULL`)
    await queryRunner.query(`ALTER TABLE "course" ADD "subjectId" uuid NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "course" ADD CONSTRAINT "FK_9907378074b1d484169df5d5b5f" FOREIGN KEY ("gradeId") REFERENCES "grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "course" ADD CONSTRAINT "FK_33b8f63c3518fa33a82e3779253" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_33b8f63c3518fa33a82e3779253"`)
    await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_9907378074b1d484169df5d5b5f"`)
    await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "subjectId"`)
    await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "gradeId"`)
  }
}
