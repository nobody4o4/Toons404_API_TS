import e, { Request, Response } from 'express';
import { prisma } from '..';


//create a new club
export const createClub = async (req: Request, res: Response) => {
    const { title, description, authorId, coverImage } = req.body;
    try {
        const club = await prisma.forum.create({
            data: { 
                title,
                coverImage,
                description,
                authorId,
            }
        });
        res.json(club);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//get all Club 
export const getClubs = async (req: Request, res: Response) => {
    try {
        const clubs = await prisma.forum.findMany();
        res.json(clubs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//get a Club by id
export const getClubById = async (req: Request, res: Response) => {
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

//update a Club by id
export const updateClub = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, coverImage } = req.body;
    try {
        const club = await prisma.forum.update({
            where: {
                id
            },
            data: {
                title,
                coverImage,
                description
            }
        });
        res.json(club);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//delete a club by id
export const deleteClub = async (req: Request, res: Response) => {
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