import { MigrationInterface, QueryRunner } from "typeorm";

export class Change1732567288778 implements MigrationInterface {
    name = 'Change1732567288778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`details\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orderdetails\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`code\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`amount\` int NOT NULL, \`sum\` int NOT NULL, \`discount\` int NOT NULL DEFAULT '0', \`compdate\` date NULL, \`comment\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`firmId\` bigint NOT NULL, \`orderId\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`firms\` ADD \`phone\` varchar(13) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`firms\` ADD \`email\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orderdetails\` ADD CONSTRAINT \`FK_e23ea206f3121c5d17055093c37\` FOREIGN KEY (\`firmId\`) REFERENCES \`firms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orderdetails\` ADD CONSTRAINT \`FK_bc6f3e36a98f8792feaa2db9c02\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orderdetails\` DROP FOREIGN KEY \`FK_bc6f3e36a98f8792feaa2db9c02\``);
        await queryRunner.query(`ALTER TABLE \`orderdetails\` DROP FOREIGN KEY \`FK_e23ea206f3121c5d17055093c37\``);
        await queryRunner.query(`ALTER TABLE \`firms\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`firms\` DROP COLUMN \`phone\``);
        await queryRunner.query(`DROP TABLE \`orderdetails\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
    }

}
