// controller for adding comment in chapter 

import { Request, Response } from "express";
import { prisma } from "..";



export const addComment = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body, 'woowowowowowowoowow');
    const { comment } = req.body;
    const { chapterId } = req.params;
    const userId = req.user.id;

    const addedComment = await prisma.comments.create({
      data: {
        content: comment,
        chapter:{
            connect:{
                id: chapterId
            }
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res.status(201).json(addedComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//controller for removing comment from chapter
export const removeComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const { commentId } = req.body;

        const comment = await prisma.comments.delete({
            where: {
                id: commentId,
            },
        });

        res.status(200).json(comment);
    } catch (error) {
        console.error('Error removing comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//controller for deleting comment in chapter
export const deleteComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const { commentId } = req.body;

        const comment = await prisma.comments.delete({
            where: {
                id: commentId,
            },
        });

        res.status(200).json(comment);
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//controller for getting comment in chapter
export const getComment = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;
    try {
        const comment = await prisma.comments.findMany({
            where: {
                chapterId: req.params.chapterId,
            },
            include:{
                user:{
                    select:{
                        username:true,
                        avatar:true

                    }
                }
                ,
                ...( userId &&
                    {Likes:{
                        where:{
                            userId:req.user?.id
                        },
                        select:{
                            userId:true
                        }
                    }}
        ),
                _count: {
                    select: {
                      Likes: true,
                    }
                  }
            }
        });
        res.status(200).json(comment);
    } catch (error) {
        console.error('Error fetching comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};