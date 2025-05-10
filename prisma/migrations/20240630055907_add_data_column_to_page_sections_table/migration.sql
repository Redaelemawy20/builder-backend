-- DropIndex
DROP INDEX `Permission_roleId_fkey` ON `permission`;

-- AlterTable
ALTER TABLE `pagesections` ADD COLUMN `data` JSON NOT NULL;
