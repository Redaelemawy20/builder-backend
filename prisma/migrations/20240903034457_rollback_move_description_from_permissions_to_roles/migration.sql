/*
  Warnings:

  - You are about to drop the column `description` on the `permission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `permission` DROP COLUMN `description`;

-- AlterTable
ALTER TABLE `role` ADD COLUMN `description` VARCHAR(191) NULL;
