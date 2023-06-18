import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPaymentDateCourse1686760527657 implements MigrationInterface {
    name = 'AddPaymentDateCourse1686760527657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" ADD "paymentDate" integer NOT NULL DEFAULT '30'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "paymentDate"`);
    }

}
