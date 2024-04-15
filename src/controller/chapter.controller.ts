import { Request, Response } from 'express';
import { prisma } from '..';


// Controller function to create a new chapter
export const createChapter = async (req: Request, res: Response): Promise<void> => {
  const image = req.upload_urls?.Single_file;
  const { title, content} = req.body;
  const { novelId } = req.params;
  console.log(title, content, novelId, 'chapter...');
  try {
    const newChapter = await prisma.chapter.create({
      data: {
        title,
        content,
        novelId,
        thumbnail: image,
      },
    });

    if(!newChapter){
      res.status(400).json({ error: 'Invalid request' });
      return;
    }

    //Get total number of chapters in the novel
    const totalChapters = await prisma.chapter.count({
      where: {
        novelId: novelId,
      },
    });

    // Increment the chapter count of the novel
    const updatedNewNovel = await prisma.chapter.update({
      where: {
        id: newChapter.id,
      },
      ...( totalChapters > 0 ? {
        data: {
          number: totalChapters,
        },

      } : {
        data: {
          number: 1,
        },
      
      }),

    });
    


    res.status(201).json(updatedNewNovel);
  } catch (error) {
    console.error('Error creating chapter:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get all chapters of a novel
export const getAllChaptersByNovelId = async (req: Request, res: Response): Promise<void> => {
  const { novelId } = req.params;
  const userId = req.user?.id;

  try {
    const chapters = await prisma.chapter.findMany({
      where: {
        novelId,
      },
      select:{
        id:true,
        title:true,
        number:true,
        views:true,
        ...(userId && {
          Likes: {
            where:{
            userId: req.user.id
            }
            ,select:{
              userId: true
            }
          },
        }),
        thumbnail:true,
        createdAt:true,
        _count: {
          select: {
            Likes: true,
          }
        }
      },
      orderBy: {
        number: 'asc',
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
  const userId = req.user?.id;
  console.log(userId,"jdncjndsjkcnjkdsncjkdnsjkc")
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
      include:{
        
        ...(userId && {
          Likes: {
            where:{
            userId: userId
            }
            ,select:{
              userId: true
            }
          },
        }),
        _count: {
          select: {
            Likes: true,
          }
        },
        novel:{
          select:{
            title:true,
            author:{
              select:{
                username:true

              }
            }
          }
        },
      },
    });

    if (!chapter) {
      res.status(404).json({ error: 'Chapter not found' });
      return;
    }

    //count views 
    const countViews = await prisma.chapter.update({
      where: {
        id: chapter.id,
      },
      data: {
        views: {
          increment: 1
        }
      }
    })

    res.status(200).json(chapter);
  } catch (error) {
    console.error('Error fetching chapter:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller function to get a single chapter by ID
export const getChapterById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user?.id;

  try {
    const chapter = await prisma.chapter.findUnique({
      where: {
        id: id,
      },
      include:{
        ...(userId && {
          Likes: {
            where:{
            userId: req.user.id
            }
            ,select:{
              userId: true
            }
          },
        }),
        _count: {
          select: {
            Likes: true,
          }
        },
        novel:{
          select:{
            title:true,
            author:{
              select:{
                username:true
              }
            }
          }
        },
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
  const image = req.upload_urls?.Single_file;
  const { id } = req.params;
  const { title, content } = req.body;
  console.log(req.body, 'update chapter... REQ BODYYYYYY')
  console.log(title, content, image, 'update chapter... DATATATATATTATA')

  // Check that all fields are present
  if (!title || !content) {
    res.status(400).json({ error: 'Please provide all fields' });
    return;
  }

  try {
    const updatedChapter = await prisma.chapter.update({
      where: {
        id: id,
      },
      data: {
        title,
        content,
        thumbnail:image
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
  const userId = req.user?.id;

  try {
    const nextChapter = await prisma.chapter.findFirst({
      where: {
        novelId,
        number: {
          gt: parseInt(currentChapterNumber),
        },
      },
      include:{
        ...(userId && {
          Likes: {
            where:{
            userId: userId
            }
            ,select:{
              userId: true
            }
          },
        }),
        _count: {
          select: {
            Likes: true,
          }
        },
        novel:{
          select:{
            title:true,
            author:{
              select:{
                username:true

              }
            }
          }
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
  const userId = req.user?.id;
  try {
    const previousChapter = await prisma.chapter.findFirst({
      where: {
        novelId,
        number: {
          lt: parseInt(currentChapterNumber),
        },
      },
      include:{...(userId && {
        Likes: {
          where:{
          userId: userId
          }
          ,select:{
            userId: true
          }
        },
      }),
      _count: {
        select: {
          Likes: true,
        }
      },
      novel:{
        select:{
          title:true,
          author:{
            select:{
              username:true

            }
          }
        }
      },},
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

