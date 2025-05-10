-- DropForeignKey
ALTER TABLE `cerdential` DROP FOREIGN KEY `Cerdential_userId_fkey`;

-- AlterTable
ALTER TABLE `cerdential` ADD COLUMN `entityId` INTEGER NULL,
    MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Cerdential` ADD CONSTRAINT `Cerdential_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cerdential` ADD CONSTRAINT `Cerdential_entityId_fkey` FOREIGN KEY (`entityId`) REFERENCES `Entity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
