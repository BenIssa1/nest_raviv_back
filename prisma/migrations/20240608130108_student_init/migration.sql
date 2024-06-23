-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(65) NOT NULL,
    "lastName" VARCHAR(65) NOT NULL,
    "phone" VARCHAR(255),
    "classroom" VARCHAR(255),
    "establisment" VARCHAR(255),
    "userId" INTEGER NOT NULL,
    "framerId" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_framerId_key" ON "Student"("framerId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_framerId_fkey" FOREIGN KEY ("framerId") REFERENCES "Framer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
