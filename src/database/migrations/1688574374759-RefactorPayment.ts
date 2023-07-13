import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorPayment1688574374759 implements MigrationInterface {
    name = 'RefactorPayment1688574374759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "paidAt"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "enrolment" ADD "paymentId" uuid`);
        await queryRunner.query(`ALTER TABLE "enrolment" ADD CONSTRAINT "UQ_641cf4f59ceccec060bacacc155" UNIQUE ("paymentId")`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "amount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "enrolment" ADD CONSTRAINT "FK_641cf4f59ceccec060bacacc155" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrolment" DROP CONSTRAINT "FK_641cf4f59ceccec060bacacc155"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "amount" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "enrolment" DROP CONSTRAINT "UQ_641cf4f59ceccec060bacacc155"`);
        await queryRunner.query(`ALTER TABLE "enrolment" DROP COLUMN "paymentId"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "paidAt" TIMESTAMP NOT NULL`);
    }

}
