import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUserAndRole1683969641983 implements MigrationInterface {
  name = 'AddUserAndRole1683969641983'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "grade" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "level" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_58c2176c3ae96bf57daebdbcb5e" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "subject_map_grade" ("subjectId" character varying NOT NULL, "gradeId" character varying NOT NULL, CONSTRAINT "PK_68bcce77e106c63d17859c4131c" PRIMARY KEY ("subjectId", "gradeId"))`
    )
    await queryRunner.query(
      `CREATE TABLE "subject" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "level" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "refreshToken" character varying NOT NULL, "userId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "fullName" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "gender" integer NOT NULL, "birthday" TIMESTAMP NOT NULL, "roleId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_f2578043e491921209f5dadd080" UNIQUE ("phoneNumber"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "tutor_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cvImage" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "REL_0591590c2e4de3d1db85f49afc" UNIQUE ("userId"), CONSTRAINT "PK_a3f063e076a5d3020b910f3d38e" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_0591590c2e4de3d1db85f49afc" ON "tutor_detail" ("userId") `
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "tutor_detail" ADD CONSTRAINT "FK_0591590c2e4de3d1db85f49afcd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tutor_detail" DROP CONSTRAINT "FK_0591590c2e4de3d1db85f49afcd"`
    )
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_0591590c2e4de3d1db85f49afc"`)
    await queryRunner.query(`DROP TABLE "tutor_detail"`)
    await queryRunner.query(`DROP TABLE "user"`)
    await queryRunner.query(`DROP TABLE "token"`)
    await queryRunner.query(`DROP TABLE "subject"`)
    await queryRunner.query(`DROP TABLE "subject_map_grade"`)
    await queryRunner.query(`DROP TABLE "role"`)
    await queryRunner.query(`DROP TABLE "grade"`)
  }
}
