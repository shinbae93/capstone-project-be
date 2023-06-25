import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddQuizAndAssignment1687593976200 implements MigrationInterface {
  name = 'AddQuizAndAssignment1687593976200'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "quiz" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" character varying NOT NULL, "files" jsonb, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "courseId" uuid NOT NULL, "classId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_422d974e7217414e029b3e641d0" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "assignment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "files" jsonb, "feedback" character varying, "quizId" uuid NOT NULL, "userId" uuid NOT NULL, "courseId" uuid NOT NULL, "classId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_43c2f5a3859f54cedafb270f37e" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "quiz" ADD CONSTRAINT "FK_f74ae73a766eea8e0dfb09816ba" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "quiz" ADD CONSTRAINT "FK_e89bae18b1b6c5e596941a68f2c" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "assignment" ADD CONSTRAINT "FK_f1faf591e51c5964ad6a2caddd3" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "assignment" ADD CONSTRAINT "FK_b3ae3ab674b9ba61a5771e906da" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "assignment" ADD CONSTRAINT "FK_5218258c0784c8b47c5079b8198" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "assignment" ADD CONSTRAINT "FK_06502a00f4ff25d2f52f236ac5a" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "assignment" DROP CONSTRAINT "FK_06502a00f4ff25d2f52f236ac5a"`)
    await queryRunner.query(`ALTER TABLE "assignment" DROP CONSTRAINT "FK_5218258c0784c8b47c5079b8198"`)
    await queryRunner.query(`ALTER TABLE "assignment" DROP CONSTRAINT "FK_b3ae3ab674b9ba61a5771e906da"`)
    await queryRunner.query(`ALTER TABLE "assignment" DROP CONSTRAINT "FK_f1faf591e51c5964ad6a2caddd3"`)
    await queryRunner.query(`ALTER TABLE "quiz" DROP CONSTRAINT "FK_e89bae18b1b6c5e596941a68f2c"`)
    await queryRunner.query(`ALTER TABLE "quiz" DROP CONSTRAINT "FK_f74ae73a766eea8e0dfb09816ba"`)
    await queryRunner.query(`DROP TABLE "assignment"`)
    await queryRunner.query(`DROP TABLE "quiz"`)
  }
}
