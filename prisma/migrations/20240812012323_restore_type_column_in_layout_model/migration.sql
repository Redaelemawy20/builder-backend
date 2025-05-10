/*
  Warnings:

  - A unique constraint covering the columns `[sectionId,entityId]` on the table `Layout` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `layout` DROP FOREIGN KEY `Layout_sectionId_fkey`;

-- AlterTable
ALTER TABLE `layout` ADD COLUMN `type` ENUM('nav', 'footer', 'news', 'section', 'persons') NOT NULL DEFAULT 'nav',
    MODIFY `sectionId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Layout_sectionId_entityId_key` ON `Layout`(`sectionId`, `entityId`);

-- AddForeignKey
ALTER TABLE `Layout` ADD CONSTRAINT `Layout_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `Section`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
