/*
  Warnings:

  - You are about to drop the column `files` on the `news` table. All the data in the column will be lost.
  - You are about to alter the column `details` on the `news` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - A unique constraint covering the columns `[slug]` on the table `News` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `news` DROP COLUMN `files`,
    ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `slug` VARCHAR(191) NOT NULL,
    MODIFY `details` JSON NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `News_slug_key` ON `News`(`slug`);
