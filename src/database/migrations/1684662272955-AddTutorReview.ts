import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddTutorReview1684662272955 implements MigrationInterface {
  name = 'AddTutorReview1684662272955'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tutor_request" RENAME COLUMN "image" TO "cvImage"`)
    await queryRunner.query(
      `CREATE TABLE "tutor_review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" character varying NOT NULL, "images" character varying array, "rating" integer NOT NULL, "authorId" uuid NOT NULL, "tutorId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f35249285a8ad78da63c1800d8f" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "tutor_review" ADD CONSTRAINT "FK_51e32a79c953e1b6ee90fe1f4ab" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "tutor_review" ADD CONSTRAINT "FK_0aa4fd889aae64e0034412b1f5e" FOREIGN KEY ("tutorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tutor_review" DROP CONSTRAINT "FK_0aa4fd889aae64e0034412b1f5e"`
    )
    await queryRunner.query(
      `ALTER TABLE "tutor_review" DROP CONSTRAINT "FK_51e32a79c953e1b6ee90fe1f4ab"`
    )
    await queryRunner.query(`DROP TABLE "tutor_review"`)
    await queryRunner.query(`ALTER TABLE "tutor_request" RENAME COLUMN "cvImage" TO "image"`)
  }
}
