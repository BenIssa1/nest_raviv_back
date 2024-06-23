/*
  Warnings:

  - You are about to drop the column `phone` on the `Student` table. All the data in the column will be lost.
  - Made the column `classroom` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `establisment` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "phone",
ALTER COLUMN "classroom" SET NOT NULL,
ALTER COLUMN "establisment" SET NOT NULL;
