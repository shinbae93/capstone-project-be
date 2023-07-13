import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPaymentStatus1687978792385 implements MigrationInterface {
    name = 'AddPaymentStatus1687978792385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" RENAME COLUMN "isPaid" TO "status"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "status" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" RENAME COLUMN "status" TO "isPaid"`);
    }

}
