import { MigrationInterface, QueryRunner } from 'typeorm'

export class Seeds1739362487261 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			"INSERT INTO `shop`.`roles` (`name`, `description`) VALUES ('USER', 'Користувач')"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`roles` (`name`, `description`) VALUES ('EDITOR', 'Редактор')"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`roles` (`name`, `description`) VALUES ('ADMIN', 'Адміністратор')"
		)
		await queryRunner.query(
			'INSERT INTO `shop`.`categories` (`name`, `ref`, `pic`) VALUES (\'{"uk":"Телефони та аксесуари","ru":"Телефоны и аксесуары"}\',\'smartphones-mobiles-accessories\',\'1.svg\')'
		)
		await queryRunner.query(
			'INSERT INTO `shop`.`categories` (`name`, `ref`, `pic`) VALUES (\'{"uk":"Ноутбуки, компьютери та мфу","ru":"Ноутбуки, компьютеры та мфу"}\',\'notes\',\'2.svg\')'
		)
		await queryRunner.query(
			'INSERT INTO `shop`.`categories` (`name`, `ref`, `pic`) VALUES (\'{"uk":"ТВ та електроніка","ru":"ТВ и электроника"}\',\'tv\',\'3.svg\')'
		)
		await queryRunner.query(
			'INSERT INTO `shop`.`categories` (`name`, `ref`, `pic`) VALUES (\'{"uk":"Аудіо техніка","ru":"Аудио техника"}\',\'audio\',\'4.svg\')'
		)
		await queryRunner.query(
			'INSERT INTO `shop`.`categories` (`name`, `ref`, `pic`) VALUES (\'{"uk":"Побутова техніка","ru":"Бытовая техника"}\',\'appliances\',\'5.svg\')'
		)
		await queryRunner.query(
			'INSERT INTO `shop`.`categories` (`name`, `ref`, `pic`) VALUES (\'{"uk":"Сантехніка","ru":"Сантехника"}\',\'plumbing\',\'6.svg\')'
		)
		await queryRunner.query(
			'INSERT INTO `shop`.`categories` (`name`, `ref`, `pic`) VALUES (\'{"uk":"Автотовари","ru":"Автотовары"}\',\'auto\',\'7.svg\')'
		)
		await queryRunner.query(
			'INSERT INTO `shop`.`categories` (`name`, `ref`, `pic`) VALUES (\'{"uk":"Велотовари","ru":"Велотовары"}\',\'bicycles\',\'8.svg\')'
		)
		await queryRunner.query(
			'INSERT INTO `shop`.`categories` (`name`, `ref`, `pic`) VALUES (\'{"uk":"Канцтовари","ru":"Канцтовары"}\',\'stationery\',\'9.svg\')'
		)
		await queryRunner.query(
			'INSERT INTO `shop`.`categories` (`name`, `ref`, `pic`) VALUES (\'{"uk":"Сад і город","ru":"Сад и огород"}\',\'garden\',\'10.svg\')'
		)
		await queryRunner.query(
			'INSERT INTO `shop`.`groups` (`name`, `ref`, `categoryId`) VALUES (\'{"uk":"Телефони","ru":"Телефоны"}\',\'phones\',1)'
		)
		await queryRunner.query(
			'INSERT INTO `shop`.`groups` (`name`, `ref`, `categoryId`) VALUES (\'{"uk":"Аксессуари","ru":"Аксессуары"}\',\'accessories\',1)'
		)
		await queryRunner.query(
			'INSERT INTO `shop`.`subgroups` (`name`, `ref`, `pic`, `groupId`) VALUES (\'{"uk":"Смартфони","ru":"Смартфоны"}\',\'smartphones\',\'1.jpg\',1)'
		)
		await queryRunner.query(
			'INSERT INTO `shop`.`subgroups` (`name`, `ref`, `pic`, `groupId`) VALUES (\'{"uk":"Мобільні телефони","ru":"Мобильные телефоны"}\',\'mobiles\',\'2.jpg\',1)'
		)
		await queryRunner.query(
			'INSERT INTO `shop`.`subgroups` (`name`, `ref`, `pic`, `groupId`) VALUES (\'{"uk":"Офісні телефони","ru":"Офисные телефоны"}\',\'office-phones\',\'3.jpg\',1)'
		)
		await queryRunner.query(
			'INSERT INTO `shop`.`subgroups` (`name`, `ref`, `pic`, `groupId`) VALUES (\'{"uk":"Чохли для смартфонів","ru":"Чехлы для смартфонов"}\',\'smartphones-covers\',\'3.jpg\',2)'
		)
		await queryRunner.query(
			'INSERT INTO `shop`.`subgroups` (`name`, `ref`, `pic`, `groupId`) VALUES (\'{"uk":"Захисне скло і плівки","ru":"Защитное стекло и пленка"}\',\'protective-glass-films\',\'3.jpg\',2)'
		)
		await queryRunner.query(
			'INSERT INTO `shop`.`subgroups` (`name`, `ref`, `pic`, `groupId`) VALUES (\'{"uk":"Портативні батареї","ru":"Портативные батареи"}\',\'portable-batteries\',\'3.jpg\',2)'
		)
		await queryRunner.query(
			'INSERT INTO `shop`.`subgroups` (`name`, `ref`, `pic`, `groupId`) VALUES (\'{"uk":"Навушники","ru":"Наушники"}\',\'Headphones\',\'3.jpg\',2)'
		)
		await queryRunner.query(
			'INSERT INTO `shop`.`subgroups` (`name`, `ref`, `pic`, `groupId`) VALUES (\'{"uk":"Портативна акустика","ru":"Портативная акустика"}\',\'portable-acoustics\',\'3.jpg\',2)'
		)
		await queryRunner.query(
			'INSERT INTO `shop`.`props` (`name`) VALUES (\'{"uk":"Бренд","ru":"Бренд"}\')'
		)
		await queryRunner.query(
			'INSERT INTO `shop`.`props` (`name`) VALUES (\'{"uk":"Об\'\'єм вбудованої пам\'\'яті","ru":"Объем встроенной памяти"}\')'
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`propdetails` (`id`, `name`, `propId`) VALUES ('brand-apple','Apple',1)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`propdetails` (`id`, `name`, `propId`) VALUES ('brand-samsung','Samsung',1)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`propdetails` (`id`, `name`, `propId`) VALUES ('brand-xiaomi','Xiaomi',1)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`propdetails` (`id`, `name`, `propId`) VALUES ('brand-nokia','Nokia',1)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`propdetails` (`id`, `name`, `propId`) VALUES ('brand-sigma','Sigma',1)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`propdetails` (`id`, `name`, `propId`) VALUES ('ram-val_4gb','4 Гб',2)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`propdetails` (`id`, `name`, `propId`) VALUES ('ram-val_6gb','6 Гб',2)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`firms` (`name`, `ipn`, `phone`, `email`) VALUES ('Nice',111111111111,'0633821947', 'sv.sergius@gmail.com')"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`products` (`code`, `name`, `amount`, `price`, `priceold`, `pic`, `imgs`, `state`, `firmId`, `subgroupId`) VALUES (1,'{\"uk\":\"Sigma Comfort 50 Optima (Black)\"}',15,99900,129900,'1.webp','1.jpg','0',1,2)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`products` (`code`, `name`, `amount`, `price`, `priceold`, `pic`, `imgs`, `state`, `firmId`, `subgroupId`) VALUES (2,'{\"uk\":\"Sigma X-style 18 Track (Black/Red)\"}',3,349900,389900,'2.webp','2.jpg','0',1,2)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`products` (`code`, `name`, `amount`, `price`, `priceold`, `pic`, `imgs`, `state`, `firmId`, `subgroupId`) VALUES (3,'{\"uk\":\"Nokia 105 Single Sim 2019 Black NOCHGR\"}',2,199900,0,'3.webp','3.jpg','0',1,2)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`products` (`code`, `name`, `amount`, `price`, `priceold`, `pic`, `imgs`, `state`, `firmId`, `subgroupId`) VALUES (4,'{\"uk\":\"Samsung Galaxy A52 A525F 4/128GB Black (SM-A525FZKDSEK)\"}',2,120000,0,'4.webp','85cd9a79ecf7409f15e5031e39536d48.jpg,5fe4217dfceb0a74c640a2e6d7badc6f.jpg,0304c6b0fd95a1b9d42c1c43288b0298.jpg,c72a970d3e7c9e5afb5a5be1384019dd.jpg,1ed5c2cdb65e73fbd52ac21a63115bba.jpg','0',1,1)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`products` (`code`, `name`, `amount`, `price`, `priceold`, `pic`, `imgs`, `state`, `firmId`, `subgroupId`) VALUES (5,'{\"uk\":\"Apple iPhone 12 64GB Purple\"}',3,150055,229900,'5.webp','4304fca57a7b0459f70a77c21150ce7a.jpg,b00bb036b569ee5a0a626b53bebc78e2.jpg,870fabd5c921869a71548a6a30e379ec.jpg','0',1,1)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`products` (`code`, `name`, `amount`, `price`, `priceold`, `pic`, `imgs`, `state`, `firmId`, `subgroupId`) VALUES (6,'{\"uk\":\"Apple iPhone 11 64Gb Black (MHDA3) Slim Box\"}',3,289900,0,'6.webp','4304fca57a7b0459f70a77c21150ce7a.jpg,b00bb036b569ee5a0a626b53bebc78e2.jpg,870fabd5c921869a71548a6a30e379ec.jpg','0',1,1)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`products` (`code`, `name`, `amount`, `price`, `priceold`, `pic`, `imgs`, `state`, `firmId`, `subgroupId`) VALUES (7,'{\"uk\":\"Samsung Galaxy A12 2021 A125F 4/64GB Blue\"}',1,449900,0,'7.webp','85cd9a79ecf7409f15e5031e39536d48.jpg,5fe4217dfceb0a74c640a2e6d7badc6f.jpg,0304c6b0fd95a1b9d42c1c43288b0298.jpg,c72a970d3e7c9e5afb5a5be1384019dd.jpg,1ed5c2cdb65e73fbd52ac21a63115bba.jpg','0',1,1)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`products` (`code`, `name`, `amount`, `price`, `priceold`, `pic`, `imgs`, `state`, `firmId`, `subgroupId`) VALUES (8,'{\"uk\":\"Samsung Galaxy A12 2021 A125F 4/64GB Blue-2\"}',5,479900,549900,'8.webp','85cd9a79ecf7409f15e5031e39536d48.jpg,5fe4217dfceb0a74c640a2e6d7badc6f.jpg,0304c6b0fd95a1b9d42c1c43288b0298.jpg,c72a970d3e7c9e5afb5a5be1384019dd.jpg,1ed5c2cdb65e73fbd52ac21a63115bba.jpg','0',1,1)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`products` (`code`, `name`, `amount`, `price`, `priceold`, `pic`, `imgs`, `state`, `firmId`, `subgroupId`) VALUES (9,'{\"uk\":\"Xiaomi Redmi Note 9 4/128Gb (Forest Green)\"}',3,849900,0,'9.webp','3eace06a7b6489a88d5ecc790f3758e4.jpg,4d34454e8a08da933497d0a4ffc877ea.jpg,006d4a46fed01f5df724aeb1a9cf8fcf.jpg,3124a5a5e926859d73c96f111086ed5c.jpg','0',1,1)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`products` (`code`, `name`, `amount`, `price`, `priceold`, `pic`, `imgs`, `state`, `firmId`, `subgroupId`) VALUES (10,'{\"uk\":\"Samsung Galaxy M12 2021 M127F 4/64GB Green\"}',10,399900,0,'10.webp','85cd9a79ecf7409f15e5031e39536d48.jpg,5fe4217dfceb0a74c640a2e6d7badc6f.jpg,0304c6b0fd95a1b9d42c1c43288b0298.jpg,c72a970d3e7c9e5afb5a5be1384019dd.jpg,1ed5c2cdb65e73fbd52ac21a63115bba.jpg','0',1,1)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`products` (`code`, `name`, `amount`, `price`, `priceold`, `pic`, `imgs`, `state`, `firmId`, `subgroupId`) VALUES (11,'{\"uk\":\"Xiaomi Redmi Note 8 2021 4/64GB (White)\"}',7,899900,0,'11.webp','3eace06a7b6489a88d5ecc790f3758e4.jpg,4d34454e8a08da933497d0a4ffc877ea.jpg,006d4a46fed01f5df724aeb1a9cf8fcf.jpg,3124a5a5e926859d73c96f111086ed5c.jpg','0',1,1)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`products` (`code`, `name`, `amount`, `price`, `priceold`, `pic`, `imgs`, `state`, `firmId`, `subgroupId`) VALUES (12,'{\"uk\":\"Xiaomi Redmi 9T 4/64GB (Carbon Gray)\"}',4,529900,0,'12.webp','3eace06a7b6489a88d5ecc790f3758e4.jpg,4d34454e8a08da933497d0a4ffc877ea.jpg,006d4a46fed01f5df724aeb1a9cf8fcf.jpg,3124a5a5e926859d73c96f111086ed5c.jpg','0',1,1)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`productinfo` (`value`, `propId`, `propdetailId`, `productId`) VALUES ('Sigma',1,'brand-sigma',1)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`productinfo` (`value`, `propId`, `propdetailId`, `productId`) VALUES ('Sigma',1,'brand-sigma',2)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`productinfo` (`value`, `propId`, `propdetailId`, `productId`) VALUES ('Nokia',1,'brand-nokia',3)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`productinfo` (`value`, `propId`, `propdetailId`, `productId`) VALUES ('Samsung',1,'brand-samsung',4)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`productinfo` (`value`, `propId`, `propdetailId`, `productId`) VALUES ('4 Гб',2,'ram-val_4gb',4)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`productinfo` (`value`, `propId`, `propdetailId`, `productId`) VALUES ('Apple',1,'brand-apple',5)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`productinfo` (`value`, `propId`, `propdetailId`, `productId`) VALUES ('4 Гб',2,'ram-val_4gb',5)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`productinfo` (`value`, `propId`, `propdetailId`, `productId`) VALUES ('Apple',1,'brand-apple',6)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`productinfo` (`value`, `propId`, `propdetailId`, `productId`) VALUES ('4 Гб',2,'ram-val_4gb',6)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`productinfo` (`value`, `propId`, `propdetailId`, `productId`) VALUES ('Samsung',1,'brand-samsung',7)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`productinfo` (`value`, `propId`, `propdetailId`, `productId`) VALUES ('6 Гб',2,'ram-val_6gb',7)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`productinfo` (`value`, `propId`, `propdetailId`, `productId`) VALUES ('Samsung',1,'brand-samsung',8)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`productinfo` (`value`, `propId`, `propdetailId`, `productId`) VALUES ('6 Гб',2,'ram-val_6gb',8)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`productinfo` (`value`, `propId`, `propdetailId`, `productId`) VALUES ('Xiaomi',1,'brand-xiaomi',9)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`productinfo` (`value`, `propId`, `propdetailId`, `productId`) VALUES ('4 Гб',2,'ram-val_4gb',9)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`productinfo` (`value`, `propId`, `propdetailId`, `productId`) VALUES ('Samsung',1,'brand-samsung',10)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`productinfo` (`value`, `propId`, `propdetailId`, `productId`) VALUES ('4 Гб',2,'ram-val_4gb',10)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`productinfo` (`value`, `propId`, `propdetailId`, `productId`) VALUES ('Xiaomi',1,'brand-xiaomi',11)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`productinfo` (`value`, `propId`, `propdetailId`, `productId`) VALUES ('4 Гб',2,'ram-val_4gb',11)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`productinfo` (`value`, `propId`, `propdetailId`, `productId`) VALUES ('Xiaomi',1,'brand-xiaomi',12)"
		)
		await queryRunner.query(
			"INSERT INTO `shop`.`productinfo` (`value`, `propId`, `propdetailId`, `productId`) VALUES ('4 Гб',2,'ram-val_4gb',12)"
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			"DELETE FROM `shop`.`roles` WHERE (`name`='USER')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`roles` WHERE (`name`='EDITOR')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`roles` WHERE (`name`='ADMIN')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`productinfo` WHERE (`propdetailId`='brand-samsung' AND `productId`=1)"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`productinfo` WHERE (`propdetailId`='ram-val_4gb' AND `productId`=1)"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`productinfo` WHERE (`propdetailId`='barand-apple' AND `productId`=2)"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`productinfo` WHERE (`propdetailId`='ram-val_4gb' AND `productId`=2)"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`productinfo` WHERE (`propdetailId`='barand-apple' AND `productId`=3)"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`productinfo` WHERE (`propdetailId`='ram-val_4gb' AND `productId`=3)"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`productinfo` WHERE (`propdetailId`='brand-samsung' AND `productId`=4)"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`productinfo` WHERE (`propdetailId`='ram-val_6gb' AND `productId`=4)"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`productinfo` WHERE (`propdetailId`='brand-samsung' AND `productId`=5)"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`productinfo` WHERE (`propdetailId`='ram-val_6gb' AND `productId`=5)"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`productinfo` WHERE (`propdetailId`='brand-xiaomi' AND `productId`=6)"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`productinfo` WHERE (`propdetailId`='ram-val_4gb' AND `productId`=6)"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`productinfo` WHERE (`propdetailId`='brand-samsung' AND `productId`=7)"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`productinfo` WHERE (`propdetailId`='ram-val_4gb' AND `productId`=7)"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`productinfo` WHERE (`propdetailId`='brand-xiaomi' AND `productId`=8)"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`productinfo` WHERE (`propdetailId`='ram-val_4gb' AND `productId`=8)"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`productinfo` WHERE (`propdetailId`='brand-xiaomi' AND `productId`=9)"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`productinfo` WHERE (`propdetailId`='ram-val_4gb' AND `productId`=9)"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`productinfo` WHERE (`propdetailId`='barand-sigma' AND `productId`=10)"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`productinfo` WHERE (`propdetailId`='barand-sigma' AND `productId`=11)"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`productinfo` WHERE (`propdetailId`='brand-nokia' AND `productId`=12)"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`products` WHERE (`name`='Sigma Comfort 50 Optima (Black)')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`products` WHERE (`name`='Sigma X-style 18 Track (Black/Red)')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`products` WHERE (`name`='Nokia 105 Single Sim 2019 Black NOCHGR')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`products` WHERE (`name`='Samsung Galaxy A52 A525F 4/128GB Black (SM-A525FZKDSEK)')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`products` WHERE (`name`='Apple iPhone 12 64GB Purple')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`products` WHERE (`name`='Apple iPhone 11 64Gb Black (MHDA3) Slim Box')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`products` WHERE (`name`='Samsung Galaxy A12 2021 A125F 4/64GB Blue')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`products` WHERE (`name`='Samsung Galaxy A12 2021 A125F 4/64GB Blue-2')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`products` WHERE (`name`='Xiaomi Redmi Note 9 4/128Gb (Forest Green)')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`products` WHERE (`name`='Samsung Galaxy M12 2021 M127F 4/64GB Green')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`products` WHERE (`name`='Xiaomi Redmi Note 8 2021 4/64GB (White)')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`products` WHERE (`name`='Xiaomi Redmi 9T 4/64GB (Carbon Gray)')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`firms` WHERE (`name`='Nice')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`propdetails` WHERE (`id`='barand-apple')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`propdetails` WHERE (`id`='brand-samsung')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`propdetails` WHERE (`id`='brand-xiaomi')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`propdetails` WHERE (`id`='brand-nokia')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`propdetails` WHERE (`id`='barand-sigma')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`propdetails` WHERE (`id`='ram-val_4gb')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`propdetails` WHERE (`id`='ram-val_6gb')"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`props` WHERE `name` LIKE '%Бренд%'"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`props` WHERE `name` LIKE '%Об\'\'єм вбудованої пам\'\'яті%'"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`subgroups` WHERE `name` LIKE '%Смартфони%'"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`subgroups` WHERE `name` LIKE '%Мобільні телефони%'"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`subgroups` WHERE `name` LIKE '%Офісні телефони%'"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`subgroups` WHERE `name` LIKE '%Чохли для смартфонів%'"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`subgroups` WHERE `name` LIKE '%Захисне скло і плівки%'"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`subgroups` WHERE `name` LIKE '%Портативні батареї%'"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`subgroups` WHERE `name` LIKE '%Навушники%'"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`subgroups` WHERE `name` LIKE '%Портативна акустика%'"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`groups` WHERE `name` LIKE '%Телефони%'"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`groups` WHERE `name` LIKE '%Аксессуари%'"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`categories` WHERE `name` LIKE '%Телефони та аксесуари%'"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`categories` WHERE `name` LIKE '%Ноутбуки, компьютери та мфу%'"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`categories` WHERE `name` LIKE '%ТВ та електроніка%'"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`categories` WHERE `name` LIKE '%Аудіо техніка%'"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`categories` WHERE `name` LIKE '%Побутова техніка%'"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`categories` WHERE `name` LIKE '%Сантехніка%'"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`categories` WHERE `name` LIKE '%Автотовари%'"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`categories` WHERE `name` LIKE '%Велотовари%'"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`categories` WHERE `name` LIKE '%Канцтовари%'"
		)
		await queryRunner.query(
			"DELETE FROM `shop`.`categories` WHERE `name` LIKE '%Сад і город%'"
		)
	}
}
