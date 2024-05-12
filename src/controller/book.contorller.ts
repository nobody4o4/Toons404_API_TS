import { Request, Response } from 'express';
import { prisma } from '..';
import { ErrorCodes, HttpException } from '../middleware/errors/index.error';
import { InternalErrors } from '../middleware/errors/internalErrors';

// Controller function to create a new book
export const createBook = async (req: Request, res: Response): Promise<void> => {
  const image = req.upload_urls?.Single_file;
  const userId = req?.user?.id;
  console.log(req.body, 'novejhdvhjbdsjcbsdjhbcjdsbjhcb')
  const { title, description, series, genre, subGenre, type, isPremium } = req.body;
  console.log(title, description, series, genre, subGenre, 'book...');

  try {
    const existingBook = await prisma.book.findUnique({
      where: {
        title: title,
      },
    });
    console.log(existingBook,"existing book")
    // If the book already exists, return an error
    if (existingBook) {
      throw new HttpException( 'Book already exists', ErrorCodes.BAD_REQUEST, 400, null);
      // res.status(400).json({ error: 'Book already exists' });
      return;
    }
    const newBook = await prisma.book.create({
      data: {
        title: title,
        description: description,
        authorId: userId,
        seriesId: "40f33230-ba09-4477-952d-c4f1c89570eb",
        type:type,
        genreId: genre,
        subGenreId: subGenre,
        coverImage: image,
        isPremium: !!isPremium
      },
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error creating book:', error);
    let exception : HttpException;
    if( error instanceof HttpException){
        exception = error;

    }else{
        exception = new InternalErrors("Something went wrong", error.message, ErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }
};

// Controller function to get all books
export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const allBooks = await prisma.book.findMany();

    res.status(200).json(allBooks);
  } catch (error) {
    console.error('Error fetching all books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const bookCard = async (req: Request, res: Response): Promise<void> => {
  const userId = req?.user?.id;
  try {
    const bookCard = await prisma.book.findMany({
      select: {
        id: true,
        title: true,
        coverImage: true,
        type: true,
        isPremium: true,
        author:{
          select:{
            username: true,
          }
        },
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
        genre: {
          select: {
            name: true,
          }
        },
        subGenre: {
          select: {
            name: true,
          }
        },
        series: {
          select: {
            title: true,
          }
        },
        _count: {
          select: {
            Likes: true,
          }
        }
      }
    })
    console.log(bookCard, "book page details")
    res.status(200).json(bookCard)
  }
  catch (error) {
    console.error('Error fetching all books cards:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

}

export const fullbookDetailById = async (req: Request, res: Response): Promise<void> => {
  const userId = req?.user?.id;
  const bookId = req?.params?.id;

  try {
    
    let bookCard = await prisma.book.findUnique({
      where: {
        id: bookId
      },
      select: {
        id: true,
        title: true,
        coverImage: true,
        likes: true,
        type: true,
        createdAt: true,
        updatedAt: true,
        isPremium: true,
        genre: {
          select: {
            id: true,
            name: true,
          }
        },
        subGenre: {
          select: {
            id: true,
            name: true,
          }
        },
        series: {
          select: {
            id: true,
            title: true,
            coverImage: true,
            description: true,
          }
        },
        description: true,
        author: {
          select: {
            username: true,
            avatar: true,
            bio: true,
          }
        },

        chapters: {
          select: {
            id: true,
            thumbnail: true,
            title: true,
            number: true,
            createdAt: true,
          }
        },
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
        }
      }
    })

    if(bookCard.type == 'COMIC'){
      const chapters = await prisma.comicChapter.findMany({
        where: {
          bookId,
        },
        select:{
          id:true,
          title:true,
          number:true,
          thumbnail:true,
          createdAt:true,
        },
        orderBy: {
          number: 'asc',
        },
        
      });
      bookCard = {...bookCard, chapters: chapters}

      console.log(bookCard, "book page details")
      res.status(200).json(bookCard)
      console.log(bookCard, "book page details")
    }
    else{
    const chapters = await prisma.chapter.findMany({
      where: {
        bookId
      },
      select: {
        id: true,
        thumbnail: true,
        title: true,
        number: true,
        createdAt: true,
      },
      orderBy: {
        number: 'asc',
      },
      
    });

  console.log(chapters,"hehe");
  bookCard = {...bookCard, chapters: chapters}

  console.log(bookCard, "book page details")
  res.status(200).json(bookCard)
  console.log(bookCard, "book page details")
  }

  // bookCard = {...bookCard, chapters: chapters}

  //   console.log(bookCard, "book page details")
  //   res.status(200).json(bookCard)
  //   console.log(bookCard, "book page details")
  }
  catch (error) {
    console.error('Error fetching all books cards:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

}

export const fullbookDetail = async (req: Request, res: Response): Promise<void> => {
  const userId = req?.user?.id;
  const bookId = req?.params?.id;
  let authorId : string = null;
  try {
    const role : string = req?.user?.role;

    if(role === 'AUTHOR'){
       authorId = userId
    }

    let book = await prisma.book.findMany({
      where: {
        id: bookId,
       ...( authorId !== null && {authorId: authorId})
      },
      select: {
        id: true,
        title: true,
        type: true,
        coverImage: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        isPremium: true,
        likes: true,
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
        genre: {
          select: {
            id: true,
            name: true,
          }
        },
        subGenre: {
          select: {
            id: true,
            name: true,
          }
        },
        series: {
          select: {
            id: true,
            title: true,
            coverImage: true,
            description: true,
          }
        },
        author: {
          select: {
            username: true,
            avatar: true,
            bio: true,
          }
        },
        chapters: {
          select: {
            id: true
          }
        },
        ComicChapter:{
          select:{
            id:true
          }
        },
        _count: {
          select: {
           
            ComicChapter:true,
            chapters: true
          }
        }

      }
    })

    console.log(book, "book page details")
    res.status(200).json(book)
    console.log(bookCard, "book page details")
  }
  catch (error) {
    console.error('Error fetching all books cards:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

}
// Controller function to get a single book by ID
export const getBookById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const book = await prisma.book.findUnique({
      where: {
        id: id,
      },
    });

    if (!book) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }

    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get a single book by title
export const getBookByTitle = async (req: Request, res: Response): Promise<void> => {
  const { title } = req.params;

  console.log(title);
  const decodedUserName: string = decodeURIComponent(title).replace(/_/g, ' ');


  try {
    const book = await prisma.book.findUnique({
      where: {
        title: decodedUserName,
      },
    });

    if (!book) {
      res.status(404).json({ error: 'Book not found vgvgh' });
      return;
    }

    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book by title:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//Controller function to get books by Genre
export const getBooksByGenre = async (req: Request, res: Response): Promise<void> => {
  const { genreId } = req.params;

  try {
    const books = await prisma.book.findMany({
      where: {
        genreId: genreId,
      },
    });

    if (!books) {
      res.status(404).json({ error: 'Books not found' });
      return;
    }

    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books by Genre:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//Controller function to get books by SubGenre
export const getBooksBySubGenre = async (req: Request, res: Response): Promise<void> => {
  const { subGenreId } = req.params;

  try {
    const books = await prisma.book.findMany({
      where: {
        subGenreId: subGenreId,
      },
    });

    if (!books) {
      res.status(404).json({ error: 'Books not found' });
      return;
    }

    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books by SubGenre:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//Contoller function to get books by Series
export const getBooksBySeries = async (req: Request, res: Response): Promise<void> => {
  const { seriesId } = req.params;

  try {
    const books = await prisma.book.findMany({
      where: {
        seriesId: seriesId,
      },
    });

    if (!books) {
      res.status(404).json({ error: 'Books not found' });
      return;
    }

    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books by Series:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller function to get books by Author
export const getBooksByAuthor = async (req: Request, res: Response): Promise<void> => {
  const { authorId } = req.params;

  try {
    const books = await prisma.book.findMany({
      where: {
        authorId: authorId,
      },
    });

    if (!books) {
      res.status(404).json({ error: 'Books not found' });
      return;
    }

    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books by Author:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller function to get book liked by user
export const getBookLikedByUser = async (req: Request, res: Response): Promise<void> => {
  const  userId  = req.user.id;

  try {
    const books = await prisma.book.findMany({
      where: {
        Likes: {
          some: {
            userId: userId,
          },

        },
      },
      select: {
        id: true,
        title: true,
        coverImage: true,
        type: true,
        ...(
          userId &&{
            Likes: {
              where:{
              userId: userId
              }
              ,select:{
                userId: true
              }
            },
          }
        ),
        _count: {
            select: {
              Likes: true,
            }
          },
        genre: {
          select: {
            name: true,
          }
        },
        subGenre: {
          select: {
            name: true,
          }
        },
        series: {
          select: {
            title: true,
          }
        }
        
      }
    });
    console.log(books, "books liked by user")

    if (!books) {
      res.status(404).json({ error: 'Books not found' });
      return;
    }

    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books liked by user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Controller function to update a book by ID
export const updateBookById = async (req: Request, res: Response): Promise<void> => {
  const image = req.upload_urls?.Single_file;
  const { id } = req.params;
  const { title, description, authorId, seriesId, genreId, subGenreId } = req.body;

  try {

    const role : string = req?.user?.role;

    if(role === 'AUTHOR'){
      const authorId = await prisma.book.findUnique({
        where:{
          id:id
        },
        select:{
              authorId:true
        }
      })
      if(authorId?.authorId !== req.user?.id){
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
    }

    const updatedBook = await prisma.book.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        authorId,
        seriesId,
        genreId,
        subGenreId,
        coverImage: image
      },
    });

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Error updating book by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller function to delete a book by ID
export const deleteBookById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.book.delete({
      where: {
        id: id,
      },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting book by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//search book by title
export const searchBookByTitle = async (req: Request, res: Response): Promise<void> => {
  const { title } = req.params;
  const userId = req.user.id;
  try {
    const books = await prisma.book.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        title: true,
        type: true,
        coverImage: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        isPremium: true,
        likes: true,
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
        genre: {
          select: {
            id: true,
            name: true,
          }
        },
        subGenre: {
          select: {
            id: true,
            name: true,
          }
        },
        series: {
          select: {
            id: true,
            title: true,
            coverImage: true,
            description: true,
          }
        },
        author: {
          select: {
            username: true,
            avatar: true,
            bio: true,
          }
        },
        chapters: {
          select: {
            id: true
          }
        },
        ComicChapter:{
          select:{
            id:true
          }
        },
        _count: {
          select: {
           
            ComicChapter:true,
            chapters: true
          }
        }

      }
    });

    if (books.length === 0) {
      // If no exact matches found, try a more flexible search
      const flexibleBooks = await prisma.book.findMany({
        where: {
          title: {
            contains: title.split(' ').join('|'),
            mode: 'insensitive',
          },
        },
      });

      if (flexibleBooks.length === 0) {
        res.status(404).json({ error: 'Books not found' });
        return;
      }

      res.status(200).json(flexibleBooks);
      return;
    }

    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books by title:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


