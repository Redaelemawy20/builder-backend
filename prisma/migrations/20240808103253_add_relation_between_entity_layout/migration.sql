/*
  Warnings:

  - Added the required column `entityId` to the `Layout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `layout` ADD COLUMN `entityId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Layout` ADD CONSTRAINT `Layout_entityId_fkey` FOREIGN KEY (`entityId`) REFERENCES `Entity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
