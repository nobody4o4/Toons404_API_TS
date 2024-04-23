import e, { Request, Response } from 'express';
import { prisma } from '..';


//create a new forum
export const createForum = async (req: Request, res: Response) => {
    const { title, description, authorId, coverImage } = req.body;
    try {
        const forum = await prisma.forum.create({
            data: {
                title,
                coverImage,
                description,
                authorId,
            }
        });
        res.json(forum);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//get all forums 
export const getForums = async (req: Request, res: Response) => {
    try {
        const forums = await prisma.forum.findMany();
        res.json(forums);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//get a forum by id
export const getForumById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const forum = await prisma.forum.findUnique({
            where: {
                id
            }
        });
        res.json(forum);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//update a forum by id
export const updateForum = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, coverImage } = req.body;
    try {
        const forum = await prisma.forum.update({
            where: {
                id
            },
            data: {
                title,
                coverImage,
                description
            }
        });
        res.json(forum);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//delete a forum by id
export const deleteForum = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.forum.delete({
            where: {
                id
            }
        });
        res.json({ message: 'Forum deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//get all posts in a forum
export const getPosts = async (req: Request, res: Response) => {
    const { forumId } = req.params;
    try {
        const posts = await prisma.post.findMany({
            where: {
                forumId
            }
        });
        res.json(posts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}