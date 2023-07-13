import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdatePayoutForTutor1688898733285 implements MigrationInterface {
  name = 'UpdatePayoutForTutor1688898733285'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"`)
    await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "userId" DROP NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"`)
    await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "userId" SET NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }
}
