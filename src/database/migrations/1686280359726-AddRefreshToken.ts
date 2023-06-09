import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddRefreshToken1686280359726 implements MigrationInterface {
  name = 'AddRefreshToken1686280359726'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "refreshToken" character varying`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`)
  }
}
