import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddStripeCustomerIdAndCalendar1687192455021 implements MigrationInterface {
  name = 'AddStripeCustomerIdAndCalendar1687192455021'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "calendar" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "courseName" character varying NOT NULL, "className" character varying NOT NULL, "method" character varying NOT NULL, "date" date NOT NULL, "startTime" character varying NOT NULL, "endTime" character varying NOT NULL, "courseId" uuid NOT NULL, "classId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2492fb846a48ea16d53864e3267" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(`ALTER TABLE "user" ADD "stripeCustomerId" character varying`)
    await queryRunner.query(
      `ALTER TABLE "calendar" ADD CONSTRAINT "FK_e163181c8c622acf9d5e72b88e5" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "calendar" ADD CONSTRAINT "FK_0e0b909ea1c46cd94574cf51ef5" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "calendar" DROP CONSTRAINT "FK_0e0b909ea1c46cd94574cf51ef5"`)
    await queryRunner.query(`ALTER TABLE "calendar" DROP CONSTRAINT "FK_e163181c8c622acf9d5e72b88e5"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "stripeCustomerId"`)
    await queryRunner.query(`DROP TABLE "calendar"`)
  }
}
