import { prisma } from "..";
import { Request, Response } from "express";

export const getUniqueBookHistory = async (req: Request, res: Response) => {
  const userId  = req?.user?.id;

  try {
    const comicHistory = await prisma.history.findMany({
      where: { userId },
      select: {
        chapter: {
          select: {
            book: {
              select: {
                id: true,
                title: true,
                coverImage: true,
                type: true,
                genre: {
                  select: {
                    name: true,
                  },
                },
                subGenre: {
                  select: {
                    name: true,
                  },
                },
                author: {
                  select: {
                    username: true,
                  },
                },
              },
            },
          },
        },
        comicChapter: {
          select: {
            book: {
              select: {
                id: true,
                title: true,
                coverImage: true,
                type: true,
                genre: {
                  select: {
                    name: true,
                  },
                },
                subGenre: {
                  select: {
                    name: true,
                  },
                },
                author: {
                  select: {
                    username: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const uniqueBooks = [];
    const bookIds = new Set();

    for (const historyItem of comicHistory) {
      const book = historyItem.chapter?.book || historyItem.comicChapter?.book;
      if (book && !bookIds.has(book.id)) {
        bookIds.add(book.id);
        uniqueBooks.push(book);
      }
    }






    res.json(uniqueBooks);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error." });
  }
};