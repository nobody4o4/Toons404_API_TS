import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Controller function to create a new chapter
export const createChapter = async (req: Request, res: Response): Promise<void> => {
  const { title, content, novelId, number } = req.body;

  try {
    const newChapter = await prisma.chapter.create({
      data: {
        title,
        content,
        novelId,
        number,
      },
    });
    res.status(201).json(newChapter);
  } catch (error) {
    console.error('Error creating chapter:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get all chapters of a novel
export const getAllChaptersByNovelId = async (req: Request, res: Response): Promise<void> => {
  const { novelId } = req.params;

  try {
    const chapters = await prisma.chapter.findMany({
      where: {
        novelId,
      },
      orderBy: {
        number: 'asc', // Assuming you want to order chapters by their number
      },
    });

console.log(chapters,"hehe");
    res.status(200).json(chapters);
  } catch (error) {
    console.error('Error fetching chapters:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Controller function to get a single chapter by ID
export const getChapterByNumber = async (req: Request, res: Response): Promise<void> => {
const number = parseInt(req.params.number);
const novelId = req.params.novelId;
console.log(number,novelId,"num, novelId");

  try {
    const chapter = await prisma.chapter.findFirst({
      where: {
        number: number,
        AND:[
         
          {
            novelId: novelId
          }
        ]
      },
    });

    if (!chapter) {
      res.status(404).json({ error: 'Chapter not found' });
      return;
    }
    res.status(200).json(chapter);
  } catch (error) {
    console.error('Error fetching chapter:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller function to get a single chapter by ID
export const getChapterById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const chapter = await prisma.chapter.findUnique({
      where: {
        id: id,
      },
    });

    if (!chapter) {
      res.status(404).json({ error: 'Chapter not found' });
      return;
    }

    res.status(200).json(chapter);
  } catch (error) {
    console.error('Error fetching chapter:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to update a chapter by ID
export const updateChapterById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, content, number } = req.body;

  try {
    const updatedChapter = await prisma.chapter.update({
      where: {
        id: id,
      },
      data: {
        title,
        content,
        number,
      },
    });

    res.status(200).json(updatedChapter);
  } catch (error) {
    console.error('Error updating chapter:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to delete a chapter by ID
export const deleteChapterById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.chapter.delete({
      where: {
        id: id,
      },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting chapter:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get the next chapter of a novel
export const getNextChapter = async (req: Request, res: Response): Promise<void> => {
  const { novelId, currentChapterNumber } = req.params;

  try {
    const nextChapter = await prisma.chapter.findFirst({
      where: {
        novelId,
        number: {
          gt: parseInt(currentChapterNumber),
        },
      },
      orderBy: {
        number: 'asc',
      },
    });

    if (!nextChapter) {
      res.status(404).json({ error: 'Next chapter not found' });
      return;
    }

    res.status(200).json(nextChapter);
  } catch (error) {
    console.error('Error fetching next chapter:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get previous chapter of a novel
export const getPreviousChapter = async (req: Request, res: Response): Promise<void> => {
  const { novelId, currentChapterNumber } = req.params;
  try {
    const previousChapter = await prisma.chapter.findFirst({
      where: {
        novelId,
        number: {
          lt: parseInt(currentChapterNumber),
        },
      },
      orderBy: {
        number: 'desc',
      },
    });

    if (!previousChapter) {
      res.status(404).json({ error: 'Previous chapter not found' });
      return;
    }

    res.status(200).json(previousChapter);
  } catch (error) {
    console.error('Error fetching previous chapter:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

