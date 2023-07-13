import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTypeOverduePaymentAt1688785265154 implements MigrationInterface {
    name = 'ChangeTypeOverduePaymentAt1688785265154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrolment" DROP COLUMN "overduePaymentAt"`);
        await queryRunner.query(`ALTER TABLE "enrolment" ADD "overduePaymentAt" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrolment" DROP COLUMN "overduePaymentAt"`);
        await queryRunner.query(`ALTER TABLE "enrolment" ADD "overduePaymentAt" date NOT NULL`);
    }

}
