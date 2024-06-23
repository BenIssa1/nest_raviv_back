-- CreateTable
CREATE TABLE "StoryHistories" (
    "id" SERIAL NOT NULL,
    "note" INTEGER NOT NULL,
    "percentage" INTEGER NOT NULL,
    "resolution" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "StoryHistories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StoryHistories" ADD CONSTRAINT "StoryHistories_taleId_fkey" FOREIGN KEY ("taleId") REFERENCES "Tale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryHistories" ADD CONSTRAINT "StoryHistories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
