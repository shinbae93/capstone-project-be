import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddTutorToCalendar1687320115498 implements MigrationInterface {
  name = 'AddTutorToCalendar1687320115498'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "calendar" DROP COLUMN "isTeaching"`)
    await queryRunner.query(`ALTER TABLE "calendar" ADD "tutorName" character varying NOT NULL`)
    await queryRunner.query(`ALTER TABLE "calendar" ADD "tutorId" uuid NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "calendar" ADD CONSTRAINT "FK_b712f0c3be89c46512a4c017d0e" FOREIGN KEY ("tutorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "calendar" DROP CONSTRAINT "FK_b712f0c3be89c46512a4c017d0e"`)
    await queryRunner.query(`ALTER TABLE "calendar" DROP COLUMN "tutorId"`)
    await queryRunner.query(`ALTER TABLE "calendar" DROP COLUMN "tutorName"`)
    await queryRunner.query(`ALTER TABLE "calendar" ADD "isTeaching" boolean NOT NULL DEFAULT false`)
  }
}
