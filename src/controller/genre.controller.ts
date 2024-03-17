import e, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Controller function to add a genre
export const addGenre = async (req: Request, res: Response)=> {
  const { name, description } = req.body;

  try {
    // Check if the genre already exists
    const image = req.upload_urls?.Single_file;
    console.log(name,"name.be")
    console.log(description,"name.be")
    const existingGenre = await prisma.genre.findFirst({
      where: {
        name: name,
      },
    });
    // If the genre already exists, return an error
    if (existingGenre) {
      res.status(400).json({ error: 'Genre already exists' });
      return;
    }
    // Create the new genre
    const newGenre = await prisma.genre.create({
      data: {
        name: name,
        description: description,
        coverImage:image
      },
    });
    // Send the newly created genre in the response
    res.status(201).json(newGenre);
  } catch (error) {
    console.error('Error adding genre:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateGenre =async (req: Request, res: Response) => {
    try{
      const genre = req. body;

      // Check if the genre already exists
      const existingGenre = await prisma.genre.findFirst({
        where: {
          id: req.params.id,
        },
      });
      // If the genre already exists, return an error
      if (!existingGenre) {
        res.status(400).json({ error: 'Genre does not exists' });
        return;
      }
      
      const updateGenre
      = await prisma.genre.update({
      where: {
      id: req.params.id
  },  
      data: genre
      })
      res. json (updateGenre)
 } catch (err) {
  res.status(500).json({ error: 'Internal server error' });
    
    }
}

export const deleteGenre = async (req: Request, res: Response) => {
    try {
      const existingGenre = await prisma.genre.findFirst({
        where: {
          id: req.params.id,
        },
      });
      // If the genre already exists, return an error
      if (!existingGenre) {
        res.status(400).json({ error: 'Genre does not exists' });
        return;
      }
      const deleteGenre = await prisma.genre.delete({
      where: {
      id: req.params.id
      }
      })
      res.json(deleteGenre)
    } catch (err) {
    console.log(err);
    }
}

export const getAllGenres = async (req: Request, res: Response) => {
    try {
    const genres = await prisma.genre.findMany();
    res.json(genres);
    } catch (err) {
    console.log(err);
    }
}

//get genre name and id for dropdown select in novel admin form
export const getGenreName = async (req: Request, res: Response) => {
  try {
    const genres = await prisma.genre.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    res.json(genres);
  } catch (err) {
    console.log(err);
  }
};

export const getGenreById = async (req: Request, res: Response) => {
    try {
      const existingGenre = await prisma.genre.findFirst({
        where: {
          id: req.params.id,
        },
      });
      // If the genre already exists, return an error
      if (!existingGenre) {
        res.status(400).json({ error: 'Genre does not exists' });
        return;
      }
      const genre = await prisma.genre.findUnique({
      where: {
      id: req.params.id
      }
      })
      res.json(genre);
    } catch (err) {
    console.log(err);
    }
}

