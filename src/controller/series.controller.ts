import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Controller function to create a new series
export const createSeries = async (req: Request, res: Response): Promise<void> => {
  const coverImage = req.upload_urls?.Single_file;
  const { title, description } = req.body;
  console.log(title, 'title.be');

  try {
    const existingGenre = await prisma.series.findFirst({
      where: {
        title: title,
      },
    });
    // If the genre already exists, return an error
    if (existingGenre) {
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
    const allSeries = await prisma.series.findMany();

    res.status(200).json(allSeries);
    console.log(allSeries,"dinesh");
  } catch (error) {
    console.error('Error fetching all series:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get a single series by ID
export const getSeriesById = async (req: Request, res: Response): Promise<void> => {
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

// Controller function to update a series by ID
export const updateSeriesById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updatedSeries = await prisma.series.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
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
