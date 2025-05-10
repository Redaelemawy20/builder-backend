/*
  Warnings:

  - You are about to drop the column `email` on the `cerdential` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Cerdential` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Cerdential` table without a default value. This is not possible if the table is not empty.
  - Made the column `roleId` on table `permission` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `slug` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_entityId_fkey`;

-- DropIndex
DROP INDEX `Cerdential_email_key` ON `cerdential`;

-- AlterTable
ALTER TABLE `cerdential` DROP COLUMN `email`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `permission` MODIFY `roleId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `slug` VARCHAR(191) NOT NULL,
    MODIFY `entityId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Cerdential_userId_key` ON `Cerdential`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_slug_key` ON `User`(`slug`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_entityId_fkey` FOREIGN KEY (`entityId`) REFERENCES `Entity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cerdential` ADD CONSTRAINT `Cerdential_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
