import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCourseStatusColumn1685267924710 implements MigrationInterface {
    name = 'UpdateCourseStatusColumn1685267924710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" ADD "isPublished" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "enrolment" ADD "isFinished" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrolment" DROP COLUMN "isFinished"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "isPublished"`);
    }

}
