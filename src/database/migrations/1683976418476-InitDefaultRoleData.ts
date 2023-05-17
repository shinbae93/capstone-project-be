import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitDefaultRoleData1683976418476 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO role (id, name) VALUES 
            ('b9961f54-9748-424d-9453-7dbeec05e212', 'Admin'), 
            ('33358dbf-7697-4324-bccd-334a3691b84b', 'Tutor'), 
            ('9a588a6e-c21e-48f5-a8da-307724a76b89', 'Student');
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM role WHERE id IN ('b9961f54-9748-424d-9453-7dbeec05e212', '33358dbf-7697-4324-bccd-334a3691b84b', '9a588a6e-c21e-48f5-a8da-307724a76b89');`
    )
  }
}
