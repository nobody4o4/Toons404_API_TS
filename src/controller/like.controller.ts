//controllers for likes on books,chapers and comments
import { Request, Response } from "express";
import { prisma } from "..";

export const addLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, likedItemId } = req.body;
    const userId = req.user.id;

    console.log(type, likedItemId, userId, "type, likedItemId, userId")

    // Validate the request
    if (!['book', 'chapter', 'comment','series', 'comicChapter', 'post'].includes(type)) {
      res.status(400).json({ error: 'Invalid request' });
      return;
    }

    type === 'comicChapter' && console.log('comicChapter')

    if (!userId || !type || !likedItemId) {
      res.status(400).json({ error: 'Invalid request' });
      return;
    }
    // Check if the user has already liked the item
    const existingLike = await prisma.likes.findFirst({
      where: {
        userId,
        ...(type === 'book' && { bookId: likedItemId }),
        ...(type === 'chapter' && { chapterId: likedItemId }),
        ...(type === 'comment' && { commentId: likedItemId }),
        ...(type === 'series' && { seriesId: likedItemId }),
        ...(type === 'comicChapter' && { comicChapterId: likedItemId }),
        ...(type === "post" && { postId : likedItemId}),
      },
    });

    if (existingLike) {
      res.status(400).json({ error: 'You have already liked this item' });
      return;
    }

    // Create the like with the user and related associations
    const like = await prisma.likes.create({
      data: {
        user: { connect: { id: userId } },
        ...(type === 'book' && { book: { connect: { id: likedItemId } } }),
        ...(type === 'chapter' && { chapter: { connect: { id: likedItemId } } }),
        ...(type === 'comment' && { comment: { connect: { id: likedItemId } } }),
        ...(type === 'series' && { series: { connect: { id: likedItemId } } }),
        ...(type === 'comicChapter' && { comicChapter: { connect: { id: likedItemId } } }),
        ...(type === "post" && { post:{connect : {id: likedItemId}}}),
      },
    });

    res.status(200).json(like);
  } catch (error) {
    console.error('Error adding like:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//controller for removing likes from books, chapters and comments
export const removeLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const { type, likedItemId } = req.body;

    // Validate the request
    if (!['book', 'chapter', 'comment', 'series','comicChapter','post'].includes(type)) {
      res.status(400).json({ error: 'Invalid request' });
      return;
    }

    if (!userId || !type || !likedItemId) {
      res.status(400).json({ error: 'Invalid request' });
      return;
    }

    // Remove the like
    const result = await prisma.likes.deleteMany({
      where: {
        userId,
        ...(type === 'book' && { bookId: likedItemId }),
        ...(type === 'chapter' && { chapterId: likedItemId }),
        ...(type === 'comment' && { commentId: likedItemId }),
        ...(type === 'series' && { seriesId: likedItemId }),
        ...(type === 'comicChapter' && { comicChapterId: likedItemId }),
        ...(type === "post" && { postId : likedItemId}),
      },
    });

    // Check if a like was removed
    if (result.count > 0) {
      res.status(200).json({ message: 'Like removed successfully' });
    } else {
      res.status(404).json({ error: 'Like not found' });
    }
  } catch (error) {
    console.error('Error removing like:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//controller for getting likes on books
export const getBookLikes = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookLikes = await prisma.likes.findMany({
      where: {
        bookId: req.params.id
      },
    });
    res.status(200).json(bookLikes);
  } catch (error) {
    console.error('Error fetching book likes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

//controller for getting likes on chapters
export const getChapterLikes = async (req: Request, res: Response): Promise<void> => {
  try {
    const chapterLikes = await prisma.likes.findMany({
      where: {
        chapterId: req.params.id
      }
    });
    res.status(200).json(chapterLikes);
  } catch (error) {
    console.error('Error fetching chapter likes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

//controller for getting likes on comments
export const getCommentLikes = async (req: Request, res: Response): Promise<void> => {
  try {
    const commentLikes = await prisma.likes.findMany({
      where: {
        commentId: req.params.id
      }
    });
    res.status(200).json(commentLikes);
  } catch (error) {
    console.error('Error fetching comment likes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


//controller for geting likes on comments, 
//controller for removing likes from books, chapters and comments
export const getLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const { type, likedItemId } = req.body;
    console.log(userId, type, likedItemId, "userId, type, likedItemId")
    if (!['book', 'chapter', 'comment', 'series'].includes(type)) {
      res.status(400).json({ error: 'Invalid request' });
      return
    }
    if (!userId || !type || !likedItemId) {
      res.status(400).json({ error: 'Invalid request' });
      return
    }
    const like = await prisma.likes.findMany({
      where: {
        userId: userId,
        ...(type === 'book' && { bookId: likedItemId }),
        ...(type === 'chapter' && { chapterId: likedItemId }),
        ...(type === 'comment' && { commentId: likedItemId }),
        ...(type === 'series' && { seriesId: likedItemId }),
      }
    });
    res.status(200).json(like);
  } catch (error) {
    console.error('Error removing like:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}