/*
  Warnings:

  - You are about to drop the column `src` on the `section` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[componentId]` on the table `Section` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `componentId` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Section_src_key` ON `section`;

-- AlterTable
ALTER TABLE `section` DROP COLUMN `src`,
    ADD COLUMN `componentId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Section_componentId_key` ON `Section`(`componentId`);
