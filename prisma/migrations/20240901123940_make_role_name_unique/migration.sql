/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `cerdential` DROP FOREIGN KEY `Cerdential_roleId_fkey`;

-- AlterTable
ALTER TABLE `cerdential` MODIFY `roleId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Role_name_key` ON `Role`(`name`);

-- AddForeignKey
ALTER TABLE `Cerdential` ADD CONSTRAINT `Cerdential_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
