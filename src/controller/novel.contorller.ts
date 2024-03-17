import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Controller function to create a new novel
export const createNovel = async (req: Request, res: Response): Promise<void> => {
  const image = req.upload_urls?.Single_file;
  const { title, description, seriesId, genreId, subGenreId } = req.body;
  console.log(title, description, seriesId, genreId, subGenreId , 'novel...');
  
  try {
    const existingNovel = await prisma.novel.findFirst({
      where: {
        title: title,
      },
    });
    // If the novel already exists, return an error
    if (existingNovel) {
      res.status(400).json({ error: 'Novel already exists' });
      return;
    }
    const newNovel = await prisma.novel.create({
      data: {
        title: title,
        description: description,
        authorId: req.user.id,
        seriesId : "705cd3a2-a3ce-49bd-a001-f01e0c063317",
        genreId :"e0075208-70f4-4191-b632-c4df3d240151",
        subGenreId : "f02ca7bf-7a8f-4457-8817-5c2d1e52bdfa",
        coverImage: image,
      },
    });

    res.status(201).json(newNovel);
  } catch (error) {
    console.error('Error creating novel:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get all novels
export const getAllNovels = async (req: Request, res: Response): Promise<void> => {
  try {
    const allNovels = await prisma.novel.findMany();

    res.status(200).json(allNovels);
  } catch (error) {
    console.error('Error fetching all novels:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const novelCard = async (req: Request, res: Response): Promise<void> => {
  try{
    const novelCard = await prisma.novel.findMany({
      select:{
        id:true,
        title:true,
        coverImage:true,
        likes:true,
        genre:{
          select:{
            name:true,
          }
        },
        subGenre:{
          select:{
            name:true,
          }
        },
        series:{
          select:{
            title:true,
          }
        }
      }
    })
    console.log(novelCard,"11")
    res.status(200).json(novelCard)
    console.log(novelCard,"22")
  }
 catch (error) {
  console.error('Error fetching all novels cards:', error);
  res.status(500).json({ error: 'Internal server error' });
}
  
}

export const fullnovelDetailById = async (req: Request, res: Response): Promise<void> => {
  try{
    const novelCard = await prisma.novel.findUnique({
      where:{
        id:req.params.id
      },
      select:{
        id:true,
        title:true,
        coverImage:true,
        likes:true,
        createdAt:true,
        genre:{
          select:{
            id:true,
            name:true,
          }
        },
        subGenre:{
          select:{
            id:true,
            name:true,
          }
        },
        series:{
          select:{
            id:true,
            title:true,
            coverImage:true,
            description:true,
          }
        },
        description:true,
        author:{
          select:{
            username:true,
          }
        },
        chapters:{
          select:{
            id:true,
            thumbnail:true,
            title:true,
            number:true,
            createdAt:true,
          }
        }
        
      }
    })
    console.log(novelCard,"novel page details")
    res.status(200).json(novelCard)
    console.log(novelCard,"novel page details")
  }
 catch (error) {
  console.error('Error fetching all novels cards:', error);
  res.status(500).json({ error: 'Internal server error' });
}
  
}

export const fullnovelDetail = async (req: Request, res: Response): Promise<void> => {
  try{

    let novel = await prisma.novel.findMany({
      where:{
        id:req.params.id
      },
      select:{
        id:true,
        title:true,
        coverImage:true,
        description:true,
        createdAt:true,
        updatedAt:true,
        likes:true,

        genre:{
          select:{
            id:true,
            name:true,
          }
        },
        subGenre:{
          select:{
            id:true,
            name:true,
          }
        },
        series:{
          select:{
            id:true,
            title:true,
          }
        },
        author:{
          select:{
            username:true,
          }
        },
        chapters:{
          select:{
            id:true
          }
        },
_count:{
  select:{
    chapters:true
  }
}
   
      }
    })
    

    console.log(novel,"novel page details")
    res.status(200).json(novel)
    console.log(novelCard,"novel page details")
  }
 catch (error) {
  console.error('Error fetching all novels cards:', error);
  res.status(500).json({ error: 'Internal server error' });
}
  
}
// Controller function to get a single novel by ID
export const getNovelById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const novel = await prisma.novel.findUnique({
      where: {
        id: id,
      },
    });

    if (!novel) {
      res.status(404).json({ error: 'Novel not found' });
      return;
    }

    res.status(200).json(novel);
  } catch (error) {
    console.error('Error fetching novel by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get a single novel by title
export const getNovelByTitle = async (req: Request, res: Response): Promise<void> => {
  const { title } = req.params;

  console.log(title);
  const decodedUserName: string = decodeURIComponent(title).replace(/_/g, ' ');


  try {
    const novel = await prisma.novel.findUnique({
      where: {
        title: decodedUserName,
      },
    });

    if (!novel) {
      res.status(404).json({ error: 'Novel not found vgvgh' });
      return;
    }

    res.status(200).json(novel);
  } catch (error) {
    console.error('Error fetching novel by title:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//Controller function to get novels by Genre
export const getNovelsByGenre = async (req: Request, res: Response): Promise<void> => {
  const { genreId } = req.params;

  try {
    const novels = await prisma.novel.findMany({
      where: {
        genreId: genreId,
      },
    });

    if (!novels) {
      res.status(404).json({ error: 'Novels not found' });
      return;
    }

    res.status(200).json(novels);
  } catch (error) {
    console.error('Error fetching novels by Genre:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//Controller function to get novels by SubGenre
export const getNovelsBySubGenre = async (req: Request, res: Response): Promise<void> => {
  const { subGenreId } = req.params;

  try {
    const novels = await prisma.novel.findMany({
      where: {
        subGenreId: subGenreId,
      },
    });

    if (!novels) {
      res.status(404).json({ error: 'Novels not found' });
      return;
    }

    res.status(200).json(novels);
  } catch (error) {
    console.error('Error fetching novels by SubGenre:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//Contoller function to get novels by Series
export const getNovelsBySeries = async (req: Request, res: Response): Promise<void> => {
  const { seriesId } = req.params;

  try {
    const novels = await prisma.novel.findMany({
      where: {
        seriesId: seriesId,
      },
    });

    if (!novels) {
      res.status(404).json({ error: 'Novels not found' });
      return;
    }

    res.status(200).json(novels);
  } catch (error) {
    console.error('Error fetching novels by Series:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller function to update a novel by ID
export const updateNovelById = async (req: Request, res: Response): Promise<void> => {
  const image = req.upload_urls?.Single_file;
  const { id } = req.params;
  const { title, description, authorId, seriesId, genreId, subGenreId } = req.body;

  try {
    const updatedNovel = await prisma.novel.update({
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
        coverImage:image
      },
    });

    res.status(200).json(updatedNovel);
  } catch (error) {
    console.error('Error updating novel by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller function to delete a novel by ID
export const deleteNovelById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.novel.delete({
      where: {
        id: id,
      },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting novel by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

