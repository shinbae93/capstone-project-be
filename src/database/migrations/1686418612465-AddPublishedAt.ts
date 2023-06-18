import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddPublishedAt1686418612465 implements MigrationInterface {
  name = 'AddPublishedAt1686418612465'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "course" ADD "publishedAt" TIMESTAMP`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "publishedAt"`)
  }
}
