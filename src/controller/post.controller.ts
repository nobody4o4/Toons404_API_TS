import e, { Request, Response } from 'express';
import { prisma } from '..';


// create new post in forum
export const createPost = async (req: Request, res: Response): Promise<void> => {
    const userId = req?.user?.id;
    const { title, content, forumId } = req.body;
    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                forumId,
                userId
            }
        });
        res.status(200).json( post );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get all posts in forum
export const getPosts = async (req: Request, res: Response): Promise<void> => {
    const { forumId } = req.params;
    try {
        const posts = await prisma.post.findMany({
            where: {
                forumId
            },
            select: {
                id: true,
                title: true,
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
        res.status(200).json( posts );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get post by id
export const getPost = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const post = await prisma.post.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                title: true,
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
        res.status(200).json( post );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// update post by id
export const updatePost = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const post = await prisma.post.update({
            where: {
                id
            },
            data: {
                title,
                content
            }
        });
        res.status(200).json( post );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// delete post by id with all comments anhd likes and replies and reply likes 
export const deletePost = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const post = await prisma.post.delete({
            where: {
                id
            }
        
        });
        res.status(200).json( post );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


