/*
  Warnings:

  - You are about to alter the column `meta` on the `entity` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - A unique constraint covering the columns `[slug]` on the table `Page` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- ALTER TABLE `entity` MODIFY `meta` JSON NOT NULL DEFAULT "{}";

-- AlterTable
ALTER TABLE `page` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Page_slug_key` ON `Page`(`slug`);
