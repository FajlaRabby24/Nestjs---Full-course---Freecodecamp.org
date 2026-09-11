import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovePhone1789135096391 implements MigrationInterface {
    name = 'RemovePhone1789135096391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }

}
