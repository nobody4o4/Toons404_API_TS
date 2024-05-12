import { Request, Response } from 'express';
import { prisma } from '..';


// Controller function to create a new chapter
// export const createChapter = async (req: Request, res: Response): Promise<void> => {
//   const image = req.upload_urls?.Single_file;
//   const { title, content} = req.body;
//   const { bookId } = req.params;
//   console.log(title, content, bookId, 'chapter...');
//   try {
//     const newChapter = await prisma.chapter.create({
//       data: {
//         title,
//         content,
//         bookId,
//         thumbnail: image,
//       },
//     });

//     if(!newChapter){
//       res.status(400).json({ error: 'Invalid request' });
//       return;
//     }

//     //Get total number of chapters in the book
//     const totalChapters = await prisma.chapter.count({
//       where: {
//         bookId: bookId,
//       },
//     });

//     // Increment the chapter count of the book
//     const updatedNewBook = await prisma.chapter.update({
//       where: {
//         id: newChapter.id,
//       },
//       ...( totalChapters > 0 ? {
//         data: {
//           number: totalChapters,
//         },

//       } : {
//         data: {
//           number: 1,
//         },
      
//       }),

//     });
    


//     res.status(201).json(updatedNewBook);
//   } catch (error) {
//     console.error('Error creating chapter:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


//controller function to create a new Comic chapter 
export const createChapter = async (req: Request, res: Response): Promise<void> => {
  const image = req.upload_urls?.Single_file;
  const chapterImage = req.upload_urls?.gallery;
  const { title, content , type} = req.body;
  const { bookId } = req.params;
  console.log(title, content, bookId, type, 'chapter...');
  console.log(type, 'chapter...tyeppepepepepep');

  try {
    if(type == 'COMIC'){
      const newChapter = await prisma.comicChapter.create({
        data: {
          title,
          bookId,
          thumbnail: image,
          number : 1
        },
      });

      while (chapterImage.length > 0) {
        const image = chapterImage.pop();
        await prisma.comicImage.create({
          data: {
            comicChapterId : newChapter.id,
            image: image,
            number: chapterImage.length + 1,
          },
        });
      }
      
  
      if(!newChapter){
        res.status(400).json({ error: 'Invalid request' });
        return;
      }
  
      //Get total number of chapters in the book
      const totalChapters = await prisma.comicChapter.count({
        where: {
          bookId: bookId,
        },
      });
  
      // Increment the chapter count of the book
      const updatedNewBook = await prisma.comicChapter.update({
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
      res.status(201).json({
        message: "Chapter created successfully",
        data: updatedNewBook
      });

    }
    else{
      const newChapter = await prisma.chapter.create({
        data: {
          title,
          content,
          bookId,
          thumbnail: image,
        },
      });
  
      if(!newChapter){
        res.status(400).json({ error: 'Invalid request' });
        return;
      }
  
      //Get total number of chapters in the book
      const totalChapters = await prisma.chapter.count({
        where: {
          bookId: bookId,
        },
      });
  
      // Increment the chapter count of the book
      const updatedNewBook = await prisma.chapter.update({
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
      res.status(201).json({
        message: "Chapter created successfully",
        data: updatedNewBook
      });
    }
    
  } catch (error) {
    console.error('Error creating chapter:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Controller function to get all chapters of a book
export const getAllChaptersByBookId = async (req: Request, res: Response): Promise<void> => {
  const { bookId, type } = req.params;
  const userId = req?.user?.id;
  console.log(type, "hdabchjdsbcj")
try{
  const bookType = await prisma.book.findFirst({
    where:{
      id: bookId
    },
    select:{
      type:true
    }
  })


  if(bookType.type == 'COMIC'){
      const chapters = await prisma.comicChapter.findMany({
        where: {
          bookId,
        },
        select:{
          id:true,
          title:true,
          number:true,
          views:true,
          book:{
            select:{
              isPremium:true,
          }},
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
          thumbnail:true,
          createdAt:true,
          _count: {
            select: {
              Likes: true,
            }
          },
          ComicImage:{
            select:{
              image:true,
              number:true
            },
            orderBy:{
              number:'asc'
            }
          }
        },
        orderBy: {
          number: 'asc',
        },
        
      });
  
      console.log(chapters,"hehe");
      res.status(200).json(chapters);
    }
    else{
    const chapters = await prisma.chapter.findMany({
      where: {
        bookId,
      },
      select:{
        id:true,
        title:true,
        number:true,
        views:true,
        book:{
          select:{
            isPremium:true,
        }},
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

console.log(chapters,"hehewwww");
    res.status(200).json(chapters);
  }
  } catch (error) {
    console.error('Error fetching chapters:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get a single chapter by ID
export const getChapterByNumber = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;
  console.log(userId,"jdncjndsjkcnjkdsncjkdnsjkc")
  const {type} = req.params;
const number = parseInt(req.params.number);
const bookId = req.params.bookId;
console.log(number,bookId,"num, bookId");

  try {
    const bookType = await prisma.book.findFirst({
      where:{
        id: bookId
      },
      select:{
        type:true
      }
    })

    console.log(bookType, "bookTypeaaa...")

    if(bookType.type == 'COMIC'){
      let chapter = await prisma.comicChapter.findFirst({
        where: {
          number: number,
          AND:[
            {
              bookId: bookId
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
          ComicImage:{
            select:{
              image:true,
              number:true
            },
            orderBy:{
              number:'asc'
            }
          },
          book:{
            select:{
              title:true,
              type:true,
              isPremium:true,
              author:{
                select:{
                  username:true
                }
              }
            }
          },
        }
      })
      if (!chapter) {
        res.status(404).json({ error: 'Chapter not found' });
        return;
      }
  
      //count views 
      await prisma.comicChapter.update({
        where: {
          id: chapter.id,
        },
        data: {
          views: {
            increment: 1
          }
        }
      })

      if (userId) {
        const existingHistory = await prisma.history.findFirst({
          where: {
            userId: userId,
            comicChapterId: chapter.id
          }
        });
      
        if (!existingHistory) {
          await prisma.history.create({
            data: {
              userId,
              comicChapterId: chapter.id
            }
          });
        }
      }

      //check previous chapter
      const previousChapter = await prisma.comicChapter.findFirst({
        where: {
          bookId,
          number: {
            lt: number,
          },
        },
        select:{
          number:true,
        },
        orderBy: {
          number: 'desc',
        },
      });

      //check next chapter
      const nextChapter = await prisma.comicChapter.findFirst({
        where: {
          bookId,
          number: {
            gt: number,
          },
          
        },
        select:{
          number:true,
        },
        orderBy: {
          number: 'asc',
        },
      });

      console.log(chapter,"chapter comiccccc")

      const chapterDetails = {
        ...chapter,
        previousChapter  : previousChapter ?? null,
        nextChapter  : nextChapter ?? null,
      };
      console.log(chapterDetails,"chapterDetails")
      console.log(chapter,"chapter comiccccc")

      res.status(200).json(chapterDetails);
    }else {

      console.log("novel chapter")
    let chapter = await prisma.chapter.findFirst({
      where: {
        number: number,
        AND:[
          {
            bookId: bookId
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
        book:{
          select:{
            title:true,
            type:true,
            isPremium:true,
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

  
    // count views 
    await prisma.chapter.update({
      where: {
        id: chapter.id,
      },
      data: {
        views: {
          increment: 1
        }
      }
    })

    if (userId) {
      const existingHistory = await prisma.history.findFirst({
        where: {
          userId: userId,
          chapterId: chapter.id

        }
      });
    
      if (!existingHistory) {
        await prisma.history.create({
          data: {
            userId,
            chapterId: chapter.id
          }
        });
      }
    }


    //check previous chapter
    const previousChapter = await prisma.chapter.findFirst({
      where: {
        bookId,
        number: {
          lt: number,
        },
      },
      select:{
        number:true,
      },
      orderBy: {
        number: 'desc',
      },
    });

    //check next chapter
    const nextChapter = await prisma.chapter.findFirst({
      where: {
        bookId,
        number: {
          gt: number,
        },
        
      },
      select:{
        number:true,
      },
      orderBy: {
        number: 'asc',
      },
    });

    console.log(chapter,"chapter novel")

    const chapterDetails = {
      ...chapter,
      previousChapter  : previousChapter ?? null,
      nextChapter  : nextChapter ?? null,
    };

  

    res.status(200).json(chapterDetails);
  }
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
        book:{
          select:{
            title:true,
            isPremium:true,
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
  const { title, content} = req.body;
  console.log(req.body, 'update chapter... REQ BODYYYYYY')
  console.log(title, content, image, 'update chapter... DATATATATATTATA')

  // Check that all fields are present
  if (!title || !content) {
    res.status(400).json({ error: 'Please provide all fields' });
    return;
  }

  const role : string = req?.user?.role;

  if(role === 'AUTHOR'){
    const authorId = await prisma.chapter.findUnique({
      where:{
        id:id
      },
      select:{
        book:{
          select:{
            authorId:true
          }
        }
      }
    })
    if(authorId?.book.authorId !== req.user?.id){
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
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
    const role : string = req?.user?.role;

    if(role === 'AUTHOR'){
      const authorId = await prisma.chapter.findUnique({
        where:{
          id:id
        },
        select:{
          book:{
            select:{
              authorId:true
            }
          }
        }
      })
      if(authorId?.book.authorId !== req.user?.id){
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
    }
    
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

// Controller function to get the next chapter of a book
export const getNextChapter = async (req: Request, res: Response): Promise<void> => {
  const { bookId, currentChapterNumber } = req.params;
  const userId = req.user?.id;

  try {
    const nextChapter = await prisma.chapter.findFirst({
      where: {
        bookId,
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
        book:{
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

// Controller function to get previous chapter of a book
export const getPreviousChapter = async (req: Request, res: Response): Promise<void> => {
  const { bookId, currentChapterNumber } = req.params;
  const userId = req.user?.id;
  try {
    const previousChapter = await prisma.chapter.findFirst({
      where: {
        bookId,
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
      book:{
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

