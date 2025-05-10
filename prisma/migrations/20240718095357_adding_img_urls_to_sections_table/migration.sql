-- DropForeignKey
ALTER TABLE `pagesections` DROP FOREIGN KEY `PageSections_pageId_fkey`;

-- DropForeignKey
ALTER TABLE `pagesections` DROP FOREIGN KEY `PageSections_sectionId_fkey`;

-- AlterTable
ALTER TABLE `section` ADD COLUMN `imgUrl` VARCHAR(191) NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE `PageSections` ADD CONSTRAINT `PageSections_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PageSections` ADD CONSTRAINT `PageSections_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `Section`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
