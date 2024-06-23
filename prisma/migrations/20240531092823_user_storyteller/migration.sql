-- CreateTable
CREATE TABLE "Storyteller" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(65) NOT NULL,
    "lastName" VARCHAR(65) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "experience" VARCHAR(255),
    "cvUrl" VARCHAR(255),
    "address" VARCHAR(255),
    "fieldOfActivity" VARCHAR(255),
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Storyteller_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Storyteller_userId_key" ON "Storyteller"("userId");

-- AddForeignKey
ALTER TABLE "Storyteller" ADD CONSTRAINT "Storyteller_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
