import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1707294016540 implements MigrationInterface {
    name = 'CreateUserTable1707294016540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "currentCount" integer NOT NULL, "countLimit" integer NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
