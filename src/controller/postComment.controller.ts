import e, { Request, Response } from 'express';
import { prisma } from '..';
 


//create new comment in post
export const createComment = async (req: Request, res: Response): Promise<void> => {
    const userId = req?.user?.id;
    const { content, postId } = req.body;
    try {
        const comment = await prisma.postComment.create({
            data: {
                content,
                postId,
                userId
            }
        });
        res.status(200).json( comment );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//get all comments in post
export const getComments = async (req: Request, res: Response): Promise<void> => {
    const { postId } = req.params;
    try {
        const comments = await prisma.postComment.findMany({
            where: {
                postId
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        avatar:true,
                        username: true,
                        email: true,
                    }
                }
            }
        });
        res.status(200).json( comments );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




