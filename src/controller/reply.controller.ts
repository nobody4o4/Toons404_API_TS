import e, { Request, Response } from 'express';
import { prisma } from '..';


// create new reply in post comment 
export const createCommentReply = async (req: Request, res: Response): Promise<void> => {
    const userId = req?.user?.id;
    const {commentId} = req.params;
    const { content } = req.body;
    try {
        const commentReply = await prisma.reply.create({
            data: {
                content,
                commentId,
                userId
            }
        });
        res.status(200).json( commentReply );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//get all replies in post comment
export const getReplies = async (req: Request, res: Response): Promise<void> => {
    const { commentId } = req.params;
    try {
        const commentReplies = await prisma.reply.findMany({
            where: {
                commentId
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
        res.status(200).json( commentReplies );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//delete reply in post comment
export const deleteReply = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const commentReply = await prisma.reply.delete({
            where: {
                id
            }
        });
        res.status(200).json( commentReply );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

