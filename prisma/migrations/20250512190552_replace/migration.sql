/*
  Warnings:

  - You are about to drop the column `entityId` on the `layout` table. All the data in the column will be lost.
  - You are about to drop the column `entityId` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `entityId` on the `page` table. All the data in the column will be lost.
  - You are about to drop the column `entityId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `entity` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sectionId,websiteId]` on the table `Layout` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[websiteId,slug]` on the table `Page` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `websiteId` to the `Layout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `websiteId` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `websiteId` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cerdential` DROP FOREIGN KEY `Cerdential_entityId_fkey`;

-- DropForeignKey
ALTER TABLE `layout` DROP FOREIGN KEY `Layout_entityId_fkey`;

-- DropForeignKey
ALTER TABLE `layout` DROP FOREIGN KEY `Layout_sectionId_fkey`;

-- DropForeignKey
ALTER TABLE `news` DROP FOREIGN KEY `News_entityId_fkey`;

-- DropForeignKey
ALTER TABLE `page` DROP FOREIGN KEY `Page_entityId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_entityId_fkey`;

-- DropIndex
DROP INDEX `Cerdential_entityId_fkey` ON `cerdential`;

-- DropIndex
DROP INDEX `Layout_entityId_fkey` ON `layout`;

-- DropIndex
DROP INDEX `Layout_sectionId_entityId_key` ON `layout`;

-- DropIndex
DROP INDEX `News_entityId_fkey` ON `news`;

-- DropIndex
DROP INDEX `Page_entityId_slug_key` ON `page`;

-- DropIndex
DROP INDEX `User_entityId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `layout` DROP COLUMN `entityId`,
    ADD COLUMN `websiteId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `news` DROP COLUMN `entityId`,
    ADD COLUMN `websiteId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `page` DROP COLUMN `entityId`,
    ADD COLUMN `websiteId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `entityId`;

-- DropTable
DROP TABLE `entity`;

-- CreateTable
CREATE TABLE `Website` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `meta` JSON NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `numberOfVisitors` INTEGER NOT NULL DEFAULT 0,
    `numberOfVisitorsPerMonth` INTEGER NOT NULL DEFAULT 0,
    `userId` INTEGER NULL,

    UNIQUE INDEX `Website_name_key`(`name`),
    UNIQUE INDEX `Website_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Layout_sectionId_websiteId_key` ON `Layout`(`sectionId`, `websiteId`);

-- CreateIndex
CREATE UNIQUE INDEX `Page_websiteId_slug_key` ON `Page`(`websiteId`, `slug`);

-- AddForeignKey
ALTER TABLE `Website` ADD CONSTRAINT `Website_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Page` ADD CONSTRAINT `Page_websiteId_fkey` FOREIGN KEY (`websiteId`) REFERENCES `Website`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Layout` ADD CONSTRAINT `Layout_websiteId_fkey` FOREIGN KEY (`websiteId`) REFERENCES `Website`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;



-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_websiteId_fkey` FOREIGN KEY (`websiteId`) REFERENCES `Website`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
