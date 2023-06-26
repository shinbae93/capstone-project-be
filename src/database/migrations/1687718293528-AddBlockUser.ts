import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddBlockUser1687718293528 implements MigrationInterface {
  name = 'AddBlockUser1687718293528'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "isBlocked" boolean NOT NULL DEFAULT false`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isBlocked"`)
  }
}
