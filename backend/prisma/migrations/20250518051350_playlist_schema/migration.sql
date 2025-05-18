-- CreateTable
CREATE TABLE "PlayList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProblemInPlayList" (
    "id" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "playListId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProblemInPlayList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayList_name_userId_key" ON "PlayList"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProblemInPlayList_problemId_playListId_key" ON "ProblemInPlayList"("problemId", "playListId");

-- AddForeignKey
ALTER TABLE "PlayList" ADD CONSTRAINT "PlayList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemInPlayList" ADD CONSTRAINT "ProblemInPlayList_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemInPlayList" ADD CONSTRAINT "ProblemInPlayList_playListId_fkey" FOREIGN KEY ("playListId") REFERENCES "PlayList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
