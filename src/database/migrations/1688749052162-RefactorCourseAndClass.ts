import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorCourseAndClass1688749052162 implements MigrationInterface {
    name = 'RefactorCourseAndClass1688749052162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "paymentDate"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "fee"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "class" ADD "fee" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "class" ADD "startDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "class" ADD "endDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tutor_report" ADD "courseId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tutor_report" ADD "classId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tutor_report" ADD CONSTRAINT "FK_2d21f483562eb33b9f6a126cf96" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tutor_report" ADD CONSTRAINT "FK_01fa76424d46c4def10e2133e53" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tutor_report" DROP CONSTRAINT "FK_01fa76424d46c4def10e2133e53"`);
        await queryRunner.query(`ALTER TABLE "tutor_report" DROP CONSTRAINT "FK_2d21f483562eb33b9f6a126cf96"`);
        await queryRunner.query(`ALTER TABLE "tutor_report" DROP COLUMN "classId"`);
        await queryRunner.query(`ALTER TABLE "tutor_report" DROP COLUMN "courseId"`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "fee"`);
        await queryRunner.query(`ALTER TABLE "course" ADD "endDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ADD "startDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ADD "fee" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ADD "paymentDate" integer NOT NULL DEFAULT '30'`);
    }

}
