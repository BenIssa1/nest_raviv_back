/*
  Warnings:

  - You are about to drop the column `framerId` on the `Tale` table. All the data in the column will be lost.
  - Added the required column `storytellerId` to the `Tale` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tale" DROP CONSTRAINT "Tale_framerId_fkey";

-- AlterTable
ALTER TABLE "Tale" DROP COLUMN "framerId",
ADD COLUMN     "storytellerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Tale" ADD CONSTRAINT "Tale_storytellerId_fkey" FOREIGN KEY ("storytellerId") REFERENCES "Storyteller"("id") ON DELETE CASCADE ON UPDATE CASCADE;
