import { MigrationInterface, QueryRunner } from 'typeorm'

export class Start1734099009226 implements MigrationInterface {
	name = 'Start1734099009226'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE \`bans\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`reason\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` bigint NULL, UNIQUE INDEX \`REL_9632281c7b064fabedd8b7ae88\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		)
		await queryRunner.query(
			`CREATE TABLE \`states\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_fe52f02449eaf27be2b2cb7acd\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		)
		await queryRunner.query(
			`CREATE TABLE \`propdetails\` (\`id\` varchar(50) NOT NULL, \`name\` varchar(255) NOT NULL, \`propId\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		)
		await queryRunner.query(
			`CREATE TABLE \`props\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		)
		await queryRunner.query(
			`CREATE TABLE \`productinfo\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`value\` varchar(255) NOT NULL, \`propId\` bigint NOT NULL, \`propdetailId\` varchar(50) NOT NULL, \`productId\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		)
		await queryRunner.query(
			`CREATE TABLE \`productpics\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`pic\` varchar(255) NOT NULL, \`productId\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		)
		await queryRunner.query(
			`CREATE TABLE \`orders\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`details\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		)
		await queryRunner.query(
			`CREATE TABLE \`orderdetails\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`code\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`amount\` int NOT NULL, \`sum\` int NOT NULL, \`discount\` int NOT NULL DEFAULT '0', \`compdate\` date NULL, \`comment\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`firmId\` bigint NOT NULL, \`orderId\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		)
		await queryRunner.query(
			`CREATE TABLE \`firms\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`ipn\` bigint NOT NULL, \`phone\` varchar(13) NOT NULL, \`email\` varchar(50) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_65cafe9027bf288960d94c7af4\` (\`name\`), UNIQUE INDEX \`IDX_5f99fae6606fbf60ee4741825f\` (\`ipn\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		)
		await queryRunner.query(
			`CREATE TABLE \`categories\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`ref\` varchar(255) NOT NULL, \`pic\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_8b0be371d28245da6e4f4b6187\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		)
		await queryRunner.query(
			`CREATE TABLE \`groups\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`ref\` varchar(255) NOT NULL, \`pic\` varchar(255) NULL, \`categoryId\` bigint NOT NULL, UNIQUE INDEX \`IDX_664ea405ae2a10c264d582ee56\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		)
		await queryRunner.query(
			`CREATE TABLE \`subgroups\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`ref\` varchar(255) NOT NULL, \`pic\` varchar(255) NOT NULL, \`groupId\` bigint NOT NULL, UNIQUE INDEX \`IDX_9418c3a084fb032d1795d4f0be\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		)
		await queryRunner.query(
			`CREATE TABLE \`products\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`code\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`amount\` int NOT NULL, \`price\` int NOT NULL DEFAULT '0', \`priceold\` int NOT NULL DEFAULT '0', \`dcount\` int NOT NULL DEFAULT '0', \`dpercent\` int NOT NULL DEFAULT '0', \`pic\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`firmId\` bigint NOT NULL, \`stateId\` bigint NOT NULL, \`subgroupId\` bigint NOT NULL, INDEX \`updatedAt-idx\` (\`updatedAt\`), UNIQUE INDEX \`IDX_7cfc24d6c24f0ec91294003d6b\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		)
		await queryRunner.query(
			`CREATE TABLE \`cartdetails\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`amount\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`productId\` bigint NOT NULL, \`cartId\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		)
		await queryRunner.query(
			`CREATE TABLE \`carts\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`userId\` bigint NULL, UNIQUE INDEX \`REL_69828a178f152f157dcf2f70a8\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		)
		await queryRunner.query(
			`CREATE TABLE \`profiles\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`gender\` varchar(1) NULL, \`avatar\` varchar(255) NULL, \`userId\` bigint NULL, UNIQUE INDEX \`REL_315ecd98bd1a42dcf2ec4e2e98\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		)
		await queryRunner.query(
			`CREATE TABLE \`roles\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`description\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		)
		await queryRunner.query(
			`CREATE TABLE \`users\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`phone\` varchar(13) NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` (\`phone\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		)
		await queryRunner.query(
			`CREATE TABLE \`activations\` (\`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` bigint NULL, UNIQUE INDEX \`REL_42b2b1a552b1b19403cad7a870\` (\`userId\`), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`
		)
		await queryRunner.query(
			`CREATE TABLE \`users_roles_roles\` (\`usersId\` bigint NOT NULL, \`rolesId\` bigint NOT NULL, INDEX \`IDX_df951a64f09865171d2d7a502b\` (\`usersId\`), INDEX \`IDX_b2f0366aa9349789527e0c36d9\` (\`rolesId\`), PRIMARY KEY (\`usersId\`, \`rolesId\`)) ENGINE=InnoDB`
		)
		await queryRunner.query(
			`CREATE TABLE \`users_firms_firms\` (\`usersId\` bigint NOT NULL, \`firmsId\` bigint NOT NULL, INDEX \`IDX_df9c2da3cc3616ad2942e2c7ab\` (\`usersId\`), INDEX \`IDX_28f144cfb7f5ae63b2379a1ec7\` (\`firmsId\`), PRIMARY KEY (\`usersId\`, \`firmsId\`)) ENGINE=InnoDB`
		)
		await queryRunner.query(
			`ALTER TABLE \`bans\` ADD CONSTRAINT \`FK_9632281c7b064fabedd8b7ae885\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE \`propdetails\` ADD CONSTRAINT \`FK_3e66cea3058290549c3e0e9ce0b\` FOREIGN KEY (\`propId\`) REFERENCES \`props\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE \`productinfo\` ADD CONSTRAINT \`FK_68784e893665e81c81938f48271\` FOREIGN KEY (\`propId\`) REFERENCES \`props\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE \`productinfo\` ADD CONSTRAINT \`FK_7b09a18255d7a758623c873f7de\` FOREIGN KEY (\`propdetailId\`) REFERENCES \`propdetails\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE \`productinfo\` ADD CONSTRAINT \`FK_2f4f173f481f75f25b0ea17bfd0\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE \`productpics\` ADD CONSTRAINT \`FK_518b019f3ad6dd436008e3e7674\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE \`orderdetails\` ADD CONSTRAINT \`FK_e23ea206f3121c5d17055093c37\` FOREIGN KEY (\`firmId\`) REFERENCES \`firms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE \`orderdetails\` ADD CONSTRAINT \`FK_bc6f3e36a98f8792feaa2db9c02\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE \`groups\` ADD CONSTRAINT \`FK_9d7cca97a960def5de2629571bb\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE \`subgroups\` ADD CONSTRAINT \`FK_e1da74d9e5dd6edf73ecfbd8abd\` FOREIGN KEY (\`groupId\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_edad012893f04bdc9c47ff41a20\` FOREIGN KEY (\`firmId\`) REFERENCES \`firms\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_ea6ac063927174d31f4cef05fe5\` FOREIGN KEY (\`stateId\`) REFERENCES \`states\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_25a925b93d0f42ad5ccb63ec22b\` FOREIGN KEY (\`subgroupId\`) REFERENCES \`subgroups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE \`cartdetails\` ADD CONSTRAINT \`FK_de97ea02c33425d964d5e670e37\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE \`cartdetails\` ADD CONSTRAINT \`FK_985b41311e4520a441254dffdb7\` FOREIGN KEY (\`cartId\`) REFERENCES \`carts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE \`carts\` ADD CONSTRAINT \`FK_69828a178f152f157dcf2f70a89\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_315ecd98bd1a42dcf2ec4e2e985\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE \`activations\` ADD CONSTRAINT \`FK_42b2b1a552b1b19403cad7a870a\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE \`users_roles_roles\` ADD CONSTRAINT \`FK_df951a64f09865171d2d7a502b1\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
		)
		await queryRunner.query(
			`ALTER TABLE \`users_roles_roles\` ADD CONSTRAINT \`FK_b2f0366aa9349789527e0c36d97\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE \`users_firms_firms\` ADD CONSTRAINT \`FK_df9c2da3cc3616ad2942e2c7abb\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
		)
		await queryRunner.query(
			`ALTER TABLE \`users_firms_firms\` ADD CONSTRAINT \`FK_28f144cfb7f5ae63b2379a1ec72\` FOREIGN KEY (\`firmsId\`) REFERENCES \`firms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`users_firms_firms\` DROP FOREIGN KEY \`FK_28f144cfb7f5ae63b2379a1ec72\``
		)
		await queryRunner.query(
			`ALTER TABLE \`users_firms_firms\` DROP FOREIGN KEY \`FK_df9c2da3cc3616ad2942e2c7abb\``
		)
		await queryRunner.query(
			`ALTER TABLE \`users_roles_roles\` DROP FOREIGN KEY \`FK_b2f0366aa9349789527e0c36d97\``
		)
		await queryRunner.query(
			`ALTER TABLE \`users_roles_roles\` DROP FOREIGN KEY \`FK_df951a64f09865171d2d7a502b1\``
		)
		await queryRunner.query(
			`ALTER TABLE \`activations\` DROP FOREIGN KEY \`FK_42b2b1a552b1b19403cad7a870a\``
		)
		await queryRunner.query(
			`ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_315ecd98bd1a42dcf2ec4e2e985\``
		)
		await queryRunner.query(
			`ALTER TABLE \`carts\` DROP FOREIGN KEY \`FK_69828a178f152f157dcf2f70a89\``
		)
		await queryRunner.query(
			`ALTER TABLE \`cartdetails\` DROP FOREIGN KEY \`FK_985b41311e4520a441254dffdb7\``
		)
		await queryRunner.query(
			`ALTER TABLE \`cartdetails\` DROP FOREIGN KEY \`FK_de97ea02c33425d964d5e670e37\``
		)
		await queryRunner.query(
			`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_25a925b93d0f42ad5ccb63ec22b\``
		)
		await queryRunner.query(
			`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ea6ac063927174d31f4cef05fe5\``
		)
		await queryRunner.query(
			`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_edad012893f04bdc9c47ff41a20\``
		)
		await queryRunner.query(
			`ALTER TABLE \`subgroups\` DROP FOREIGN KEY \`FK_e1da74d9e5dd6edf73ecfbd8abd\``
		)
		await queryRunner.query(
			`ALTER TABLE \`groups\` DROP FOREIGN KEY \`FK_9d7cca97a960def5de2629571bb\``
		)
		await queryRunner.query(
			`ALTER TABLE \`orderdetails\` DROP FOREIGN KEY \`FK_bc6f3e36a98f8792feaa2db9c02\``
		)
		await queryRunner.query(
			`ALTER TABLE \`orderdetails\` DROP FOREIGN KEY \`FK_e23ea206f3121c5d17055093c37\``
		)
		await queryRunner.query(
			`ALTER TABLE \`productpics\` DROP FOREIGN KEY \`FK_518b019f3ad6dd436008e3e7674\``
		)
		await queryRunner.query(
			`ALTER TABLE \`productinfo\` DROP FOREIGN KEY \`FK_2f4f173f481f75f25b0ea17bfd0\``
		)
		await queryRunner.query(
			`ALTER TABLE \`productinfo\` DROP FOREIGN KEY \`FK_7b09a18255d7a758623c873f7de\``
		)
		await queryRunner.query(
			`ALTER TABLE \`productinfo\` DROP FOREIGN KEY \`FK_68784e893665e81c81938f48271\``
		)
		await queryRunner.query(
			`ALTER TABLE \`propdetails\` DROP FOREIGN KEY \`FK_3e66cea3058290549c3e0e9ce0b\``
		)
		await queryRunner.query(
			`ALTER TABLE \`bans\` DROP FOREIGN KEY \`FK_9632281c7b064fabedd8b7ae885\``
		)
		await queryRunner.query(
			`DROP INDEX \`IDX_28f144cfb7f5ae63b2379a1ec7\` ON \`users_firms_firms\``
		)
		await queryRunner.query(
			`DROP INDEX \`IDX_df9c2da3cc3616ad2942e2c7ab\` ON \`users_firms_firms\``
		)
		await queryRunner.query(`DROP TABLE \`users_firms_firms\``)
		await queryRunner.query(
			`DROP INDEX \`IDX_b2f0366aa9349789527e0c36d9\` ON \`users_roles_roles\``
		)
		await queryRunner.query(
			`DROP INDEX \`IDX_df951a64f09865171d2d7a502b\` ON \`users_roles_roles\``
		)
		await queryRunner.query(`DROP TABLE \`users_roles_roles\``)
		await queryRunner.query(
			`DROP INDEX \`REL_42b2b1a552b1b19403cad7a870\` ON \`activations\``
		)
		await queryRunner.query(`DROP TABLE \`activations\``)
		await queryRunner.query(
			`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``
		)
		await queryRunner.query(
			`DROP INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\``
		)
		await queryRunner.query(`DROP TABLE \`users\``)
		await queryRunner.query(
			`DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\``
		)
		await queryRunner.query(`DROP TABLE \`roles\``)
		await queryRunner.query(
			`DROP INDEX \`REL_315ecd98bd1a42dcf2ec4e2e98\` ON \`profiles\``
		)
		await queryRunner.query(`DROP TABLE \`profiles\``)
		await queryRunner.query(
			`DROP INDEX \`REL_69828a178f152f157dcf2f70a8\` ON \`carts\``
		)
		await queryRunner.query(`DROP TABLE \`carts\``)
		await queryRunner.query(`DROP TABLE \`cartdetails\``)
		await queryRunner.query(
			`DROP INDEX \`IDX_7cfc24d6c24f0ec91294003d6b\` ON \`products\``
		)
		await queryRunner.query(`DROP INDEX \`updatedAt-idx\` ON \`products\``)
		await queryRunner.query(`DROP TABLE \`products\``)
		await queryRunner.query(
			`DROP INDEX \`IDX_9418c3a084fb032d1795d4f0be\` ON \`subgroups\``
		)
		await queryRunner.query(`DROP TABLE \`subgroups\``)
		await queryRunner.query(
			`DROP INDEX \`IDX_664ea405ae2a10c264d582ee56\` ON \`groups\``
		)
		await queryRunner.query(`DROP TABLE \`groups\``)
		await queryRunner.query(
			`DROP INDEX \`IDX_8b0be371d28245da6e4f4b6187\` ON \`categories\``
		)
		await queryRunner.query(`DROP TABLE \`categories\``)
		await queryRunner.query(
			`DROP INDEX \`IDX_5f99fae6606fbf60ee4741825f\` ON \`firms\``
		)
		await queryRunner.query(
			`DROP INDEX \`IDX_65cafe9027bf288960d94c7af4\` ON \`firms\``
		)
		await queryRunner.query(`DROP TABLE \`firms\``)
		await queryRunner.query(`DROP TABLE \`orderdetails\``)
		await queryRunner.query(`DROP TABLE \`orders\``)
		await queryRunner.query(`DROP TABLE \`productpics\``)
		await queryRunner.query(`DROP TABLE \`productinfo\``)
		await queryRunner.query(`DROP TABLE \`props\``)
		await queryRunner.query(`DROP TABLE \`propdetails\``)
		await queryRunner.query(
			`DROP INDEX \`IDX_fe52f02449eaf27be2b2cb7acd\` ON \`states\``
		)
		await queryRunner.query(`DROP TABLE \`states\``)
		await queryRunner.query(
			`DROP INDEX \`REL_9632281c7b064fabedd8b7ae88\` ON \`bans\``
		)
		await queryRunner.query(`DROP TABLE \`bans\``)
	}
}
