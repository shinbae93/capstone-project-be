import { MigrationInterface, QueryRunner } from "typeorm";

export class AddClassSlots1686471372310 implements MigrationInterface {
    name = 'AddClassSlots1686471372310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class" ADD "totalSlots" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "totalSlots"`);
    }

}
