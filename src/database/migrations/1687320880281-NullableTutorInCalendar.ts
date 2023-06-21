import { MigrationInterface, QueryRunner } from 'typeorm'

export class NullableTutorInCalendar1687320880281 implements MigrationInterface {
  name = 'NullableTutorInCalendar1687320880281'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "calendar" DROP CONSTRAINT "FK_b712f0c3be89c46512a4c017d0e"`)
    await queryRunner.query(`ALTER TABLE "calendar" ALTER COLUMN "tutorName" DROP NOT NULL`)
    await queryRunner.query(`ALTER TABLE "calendar" ALTER COLUMN "tutorId" DROP NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "calendar" ADD CONSTRAINT "FK_b712f0c3be89c46512a4c017d0e" FOREIGN KEY ("tutorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "calendar" DROP CONSTRAINT "FK_b712f0c3be89c46512a4c017d0e"`)
    await queryRunner.query(`ALTER TABLE "calendar" ALTER COLUMN "tutorId" SET NOT NULL`)
    await queryRunner.query(`ALTER TABLE "calendar" ALTER COLUMN "tutorName" SET NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "calendar" ADD CONSTRAINT "FK_b712f0c3be89c46512a4c017d0e" FOREIGN KEY ("tutorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }
}
