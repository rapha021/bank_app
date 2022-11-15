import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigrate1668529225318 implements MigrationInterface {
    name = 'initialMigrate1668529225318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "balance"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "balance" double precision NOT NULL DEFAULT '100'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "balance"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "balance" integer NOT NULL DEFAULT '100'`);
    }

}
