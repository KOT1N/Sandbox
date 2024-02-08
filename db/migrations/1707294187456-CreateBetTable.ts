import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBetTable1707294187456 implements MigrationInterface {
    name = 'CreateBetTable1707294187456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bet" ("id" SERIAL NOT NULL, "previous" integer NOT NULL, "next" integer NOT NULL, "count" integer NOT NULL, "userId" integer, CONSTRAINT "PK_4ceea2cdef435807614b8e17aed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bet" ADD CONSTRAINT "FK_23a1f21c2ca2a0b6797564d2b41" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bet" DROP CONSTRAINT "FK_23a1f21c2ca2a0b6797564d2b41"`);
        await queryRunner.query(`DROP TABLE "bet"`);
    }

}
