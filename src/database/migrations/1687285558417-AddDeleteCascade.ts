import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddDeleteCascade1687285558417 implements MigrationInterface {
  name = 'AddDeleteCascade1687285558417'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "calendar" ADD COLUMN IF NOT EXISTS "status" character varying NOT NULL`)
    await queryRunner.query(`ALTER TABLE "calendar" 
    DROP CONSTRAINT "FK_0e0b909ea1c46cd94574cf51ef5", 
    ADD CONSTRAINT "FK_0e0b909ea1c46cd94574cf51ef5" FOREIGN KEY ("classId") REFERENCES class("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    DROP CONSTRAINT "FK_c423727dde9ebe36873c5b7087f", 
    ADD CONSTRAINT "FK_c423727dde9ebe36873c5b7087f" FOREIGN KEY ("userId") REFERENCES public.user("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    DROP CONSTRAINT "FK_e163181c8c622acf9d5e72b88e5", 
    ADD CONSTRAINT "FK_e163181c8c622acf9d5e72b88e5" FOREIGN KEY ("courseId") REFERENCES course("id") ON DELETE CASCADE ON UPDATE NO ACTION;`)
    await queryRunner.query(`ALTER TABLE "class" 
    DROP CONSTRAINT "FK_cc7f1743d6514b3a4ef709d8e1d", 
    ADD CONSTRAINT "FK_cc7f1743d6514b3a4ef709d8e1d" FOREIGN KEY ("courseId") REFERENCES course("id") ON DELETE CASCADE ON UPDATE NO ACTION;`)
    await queryRunner.query(`ALTER TABLE "course" 
    DROP CONSTRAINT "FK_33b8f63c3518fa33a82e3779253", 
    ADD CONSTRAINT "FK_33b8f63c3518fa33a82e3779253" FOREIGN KEY ("subjectId") REFERENCES subject("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    DROP CONSTRAINT "FK_9907378074b1d484169df5d5b5f", 
    ADD CONSTRAINT "FK_9907378074b1d484169df5d5b5f" FOREIGN KEY ("gradeId") REFERENCES grade("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    DROP CONSTRAINT "FK_bceb52bbd16679020822f6d6f5d",   
    ADD CONSTRAINT "FK_bceb52bbd16679020822f6d6f5d" FOREIGN KEY ("userId") REFERENCES public.user("id") ON DELETE CASCADE ON UPDATE NO ACTION;`)
    await queryRunner.query(`ALTER TABLE "enrolment" 
    DROP CONSTRAINT "FK_32654bfec59f2a78ee4c2d6c9f1", 
    ADD CONSTRAINT "FK_32654bfec59f2a78ee4c2d6c9f1" FOREIGN KEY ("courseId") REFERENCES course("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    DROP CONSTRAINT "FK_fac52a1a2bb329f8561ac292f90", 
    ADD CONSTRAINT "FK_fac52a1a2bb329f8561ac292f90" FOREIGN KEY ("classId") REFERENCES class("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    DROP CONSTRAINT "FK_23a5e90b5adf89dfdfe4218b982", 
    ADD CONSTRAINT "FK_23a5e90b5adf89dfdfe4218b982" FOREIGN KEY ("userId") REFERENCES public.user("id") ON DELETE CASCADE ON UPDATE NO ACTION;`)
    await queryRunner.query(`ALTER TABLE "tutor_detail" 
    DROP CONSTRAINT "FK_0591590c2e4de3d1db85f49afcd", 
    ADD CONSTRAINT "FK_0591590c2e4de3d1db85f49afcd" FOREIGN KEY ("userId") REFERENCES public.user("id") ON DELETE CASCADE ON UPDATE NO ACTION;`)
    await queryRunner.query(`ALTER TABLE "tutor_request" 
    DROP CONSTRAINT "FK_c7d4e2d5e2f44ee12777409f82a", 
    ADD CONSTRAINT "FK_c7d4e2d5e2f44ee12777409f82a" FOREIGN KEY ("userId") REFERENCES public.user("id") ON DELETE CASCADE ON UPDATE NO ACTION;`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "calendar" DROP COLUMN "status"`)
  }
}
