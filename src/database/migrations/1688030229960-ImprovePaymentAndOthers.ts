import { MigrationInterface, QueryRunner } from "typeorm";

export class ImprovePaymentAndOthers1688030229960 implements MigrationInterface {
    name = 'ImprovePaymentAndOthers1688030229960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "tutor_detail" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tutor_detail" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "note" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "courseId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "classId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_8d275ad939d187e347da0108d47" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_c380a3c6bcd0ef2d2762ecdfe2a" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_c380a3c6bcd0ef2d2762ecdfe2a"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_8d275ad939d187e347da0108d47"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "classId"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "courseId"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "note"`);
        await queryRunner.query(`ALTER TABLE "tutor_detail" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "tutor_detail" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "name" character varying NOT NULL`);
    }

}
