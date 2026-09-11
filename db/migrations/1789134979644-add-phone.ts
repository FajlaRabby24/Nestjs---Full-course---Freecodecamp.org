import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhone1789134979644 implements MigrationInterface {
    name = 'AddPhone1789134979644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
