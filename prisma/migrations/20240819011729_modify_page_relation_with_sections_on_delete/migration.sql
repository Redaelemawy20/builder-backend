-- DropForeignKey
ALTER TABLE `pagesections` DROP FOREIGN KEY `PageSections_pageId_fkey`;

-- AddForeignKey
ALTER TABLE `PageSections` ADD CONSTRAINT `PageSections_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
