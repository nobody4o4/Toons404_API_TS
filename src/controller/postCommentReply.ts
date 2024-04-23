import e, { Request, Response } from 'express';
import { prisma } from '..';


// create new reply in post comment 
export const createCommentReply = async (req: Request, res: Response): Promise<void> => {
    const userId = req?.user?.id;
    const { content, postCommentId } = req.body;
    try {
        const commentReply = await prisma.postCommentReply.create({
            data: {
                content,
                postCommentId,
                userId
            }
        });
        res.status(200).json( commentReply );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//get all replies in post comment
export const getCommentReplies = async (req: Request, res: Response): Promise<void> => {
    const { postCommentId } = req.params;
    try {
        const commentReplies = await prisma.postCommentReply.findMany({
            where: {
                postCommentId
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
export const deleteCommentReply = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const commentReply = await prisma.postCommentReply.delete({
            where: {
                id
            }
        });
        res.status(200).json( commentReply );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

