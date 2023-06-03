import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExtraInfo1685786108361 implements MigrationInterface {
    name = 'AddExtraInfo1685786108361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tutor_detail" ADD "headline" character varying`);
        await queryRunner.query(`ALTER TABLE "tutor_detail" ADD "biography" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "course" ADD "thumbnail" character varying`);
        await queryRunner.query(`ALTER TABLE "course" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "course" ADD "objectives" character varying array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "objectives"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "thumbnail"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "tutor_detail" DROP COLUMN "biography"`);
        await queryRunner.query(`ALTER TABLE "tutor_detail" DROP COLUMN "headline"`);
    }

}
