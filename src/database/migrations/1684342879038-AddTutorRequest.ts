import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddTutorRequest1684342879038 implements MigrationInterface {
  name = 'AddTutorRequest1684342879038'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tutor_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image" character varying NOT NULL, "status" character varying NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a9307c06b0f93cfca35b4c917f9" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "tutor_request" ADD CONSTRAINT "FK_c7d4e2d5e2f44ee12777409f82a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tutor_request" DROP CONSTRAINT "FK_c7d4e2d5e2f44ee12777409f82a"`
    )
    await queryRunner.query(`DROP TABLE "tutor_request"`)
  }
}
