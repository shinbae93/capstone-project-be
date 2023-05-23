import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddClass1684771695325 implements MigrationInterface {
  name = 'AddClass1684771695325'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "class" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "method" character varying NOT NULL, "schedule" jsonb NOT NULL, "courseId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0b9024d21bdfba8b1bd1c300eae" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "startTime"`)
    await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "endTime"`)
    await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "schedule"`)
    await queryRunner.query(`ALTER TABLE "course" ADD "startDate" date NOT NULL`)
    await queryRunner.query(`ALTER TABLE "course" ADD "endDate" date NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "class" ADD CONSTRAINT "FK_cc7f1743d6514b3a4ef709d8e1d" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "class" DROP CONSTRAINT "FK_cc7f1743d6514b3a4ef709d8e1d"`)
    await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "endDate"`)
    await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "startDate"`)
    await queryRunner.query(`ALTER TABLE "course" ADD "schedule" jsonb NOT NULL`)
    await queryRunner.query(`ALTER TABLE "course" ADD "endTime" TIMESTAMP NOT NULL`)
    await queryRunner.query(`ALTER TABLE "course" ADD "startTime" TIMESTAMP NOT NULL`)
    await queryRunner.query(`DROP TABLE "class"`)
  }
}
