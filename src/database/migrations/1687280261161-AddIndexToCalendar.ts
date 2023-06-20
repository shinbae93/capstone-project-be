import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddIndexToCalendar1687280261161 implements MigrationInterface {
  name = 'AddIndexToCalendar1687280261161'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE INDEX "IDX_c423727dde9ebe36873c5b7087" ON "calendar" ("userId") `)
    await queryRunner.query(`CREATE INDEX "IDX_e163181c8c622acf9d5e72b88e" ON "calendar" ("courseId") `)
    await queryRunner.query(`CREATE INDEX "IDX_0e0b909ea1c46cd94574cf51ef" ON "calendar" ("classId") `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_0e0b909ea1c46cd94574cf51ef"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_e163181c8c622acf9d5e72b88e"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_c423727dde9ebe36873c5b7087"`)
  }
}
