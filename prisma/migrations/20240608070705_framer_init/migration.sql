-- CreateTable
CREATE TABLE "Framer" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(65) NOT NULL,
    "lastName" VARCHAR(65) NOT NULL,
    "phone" VARCHAR(255),
    "address" VARCHAR(255),
    "country" VARCHAR(255),
    "city" VARCHAR(255),
    "establisment" VARCHAR(255),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Framer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Framer_userId_key" ON "Framer"("userId");

-- AddForeignKey
ALTER TABLE "Framer" ADD CONSTRAINT "Framer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
