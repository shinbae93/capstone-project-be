import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTutorReport1687949663357 implements MigrationInterface {
    name = 'AddTutorReport1687949663357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tutor_report" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "reason" character varying NOT NULL, "images" character varying array, "status" character varying NOT NULL, "authorId" uuid NOT NULL, "tutorId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3f122d9d346a82e8c53ebb0df38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "class" ADD "address" character varying`);
        await queryRunner.query(`ALTER TABLE "tutor_report" ADD CONSTRAINT "FK_e484e2bdbf14c5e5bfa2ec8a5bd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tutor_report" ADD CONSTRAINT "FK_b685b44a8b9925af7d680461f7f" FOREIGN KEY ("tutorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tutor_report" DROP CONSTRAINT "FK_b685b44a8b9925af7d680461f7f"`);
        await queryRunner.query(`ALTER TABLE "tutor_report" DROP CONSTRAINT "FK_e484e2bdbf14c5e5bfa2ec8a5bd"`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "address"`);
        await queryRunner.query(`DROP TABLE "tutor_report"`);
    }

}
