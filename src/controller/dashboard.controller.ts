import e, { Request, Response } from 'express';
import { prisma } from "..";

// export const getGenreCount = async (req: Request, res: Response) => {

export const getStats = async (req: Request, res: Response) => {
    try {
        const genreCount = await prisma.genre.count();
        const seriesCount = await prisma.series.count();
        const novelCount = await prisma.novel.count();
        const userCount = await prisma.user.count();
        const stats = {
        genreCount,
        seriesCount,
        novelCount,
        userCount,
        };

        res.json(stats);
    } catch (err) {
        console.log(err);
    }
    }
