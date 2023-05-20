import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueNameInGradeAndSubject1684590310174 implements MigrationInterface {
    name = 'UniqueNameInGradeAndSubject1684590310174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grade" ADD CONSTRAINT "UQ_3b476d2f648bed3dfb3087fe81b" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "UQ_d011c391e37d9a5e63e8b04c977" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "UQ_d011c391e37d9a5e63e8b04c977"`);
        await queryRunner.query(`ALTER TABLE "grade" DROP CONSTRAINT "UQ_3b476d2f648bed3dfb3087fe81b"`);
    }

}
