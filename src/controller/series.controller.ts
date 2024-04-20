import { Request, Response } from 'express';
import { prisma } from '..';

// Controller function to create a new series
export const createSeries = async (req: Request, res: Response): Promise<void> => {
  const coverImage = req.upload_urls?.Single_file;
  const { title, description } = req.body;
  console.log(req.body, 'title.be');

  try {
    const existingSeries = await prisma.series.findFirst({
      where: {
        title: title,
      },
    });
    // If the genre already exists, return an error
    if (existingSeries) {
      res.status(400).json({ error: 'Series already exists' });
      return;
    }
    const newSeries = await prisma.series.create({
      data: {
        title: title,
        description: description,
        coverImage:coverImage,
        authorId: req.user.id,
      },
    });

    res.status(201).json(newSeries);
  } catch (error) {
    console.error('Error creating series:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get all series
export const getAllSeries = async (req: Request, res: Response): Promise<void> => {
  try {
    const allSeries = await prisma.series.findMany({
      include:{
        author:{
          select:{
            username:true
          }
        }
      }
    });

    res.status(200).json(allSeries);
    console.log(allSeries,"dinesh");
  } catch (error) {
    console.error('Error fetching all series:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSeriesName = async (req: Request, res: Response) => {
  try {
    const genres = await prisma.series.findMany({
      select: {
        id: true,
        title: true,
      },
    });
    res.json(genres);
  } catch (err) {
    console.log(err);
  }
};

// Controller function to get a single series by ID
export const getSeriesById = async (req: Request, res: Response): Promise<void> => {
  const userId = req?.user?.id;
  const { id } = req.params;

  try {
    const series = await prisma.series.findUnique({
      where: {
        id: id,
      },
      include:{
        author:{
          select:{
            username:true
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
    });

    if (!series) {
      res.status(404).json({ error: 'Series not found' });
      return;
    }

    res.status(200).json(series);
  } catch (error) {
    console.error('Error fetching series by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const seriesCard = async (req: Request, res: Response): Promise<void> => {
  const userId = req?.user?.id;
  try {
    const bookCard = await prisma.series.findMany({
      select: {
        id: true,
        title: true,
        coverImage: true,
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
    res.status(200).json(bookCard)
  }
  catch (error) {
    console.error('Error fetching all books cards:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

}

export const getSeriesDetails = async (req: Request, res: Response): Promise<void> => {
  const userId = req?.user?.id;
  const { id } = req.params;

  try {
    const series = await prisma.series.findUnique({
      where: {
        id: id,
      },
      include:{ 
        author: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        books: {
          select: {
            id: true,
            title: true,
            coverImage: true,
            type: true,
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
          },
        },
        _count: {
          select: {
            Likes: true,
          },
        },
        ...(userId && {
          Likes: {
            where: {
              userId: userId,
            },
            select: {
              userId: true,
            },
          },
        }),
      },
    });
    res.status(200).json(series);
  } catch (error) {
    console.error('Error getting series by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Controller function to update a series by ID
export const updateSeriesById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description } = req.body;
  const coverImage = req.upload_urls?.Single_file;

  try {
    const updatedSeries = await prisma.series.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        coverImage : coverImage,
      },
    });

    res.status(200).json(updatedSeries);
  } catch (error) {
    console.error('Error updating series by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to delete a series by ID
export const deleteSeriesById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.series.delete({
      where: {
        id: id,
      },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting series by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
