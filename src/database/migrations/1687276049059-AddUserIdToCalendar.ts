import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUserIdToCalendar1687276049059 implements MigrationInterface {
  name = 'AddUserIdToCalendar1687276049059'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "calendar" ADD "userId" uuid NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "calendar" ADD CONSTRAINT "FK_c423727dde9ebe36873c5b7087f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "calendar" DROP CONSTRAINT "FK_c423727dde9ebe36873c5b7087f"`)
    await queryRunner.query(`ALTER TABLE "calendar" DROP COLUMN "userId"`)
  }
}
