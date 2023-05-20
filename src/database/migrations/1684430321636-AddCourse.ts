import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddCourse1684430321636 implements MigrationInterface {
  name = 'AddCourse1684430321636'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "fee" double precision NOT NULL, "status" character varying NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "schedule" jsonb NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "course" ADD CONSTRAINT "FK_bceb52bbd16679020822f6d6f5d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_bceb52bbd16679020822f6d6f5d"`)
    await queryRunner.query(`DROP TABLE "course"`)
  }
}
