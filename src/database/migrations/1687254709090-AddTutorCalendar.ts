import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTutorCalendar1687254709090 implements MigrationInterface {
    name = 'AddTutorCalendar1687254709090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendar" ADD "isTeaching" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendar" DROP COLUMN "isTeaching"`);
    }

}
