/*
  Warnings:

  - You are about to drop the column `isActive` on the `website` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `website` DROP COLUMN `isActive`,
    ADD COLUMN `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE';

-- AddForeignKey
ALTER TABLE `Layout` ADD CONSTRAINT `Layout_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `Section`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
