import { Request, Response } from 'express';
import { prisma } from '..';


// add request by user to become a author
export const requestAuthor = async (req: Request, res: Response): Promise<void> => {
    const userId = req?.user?.id;
    try {
        const request = await prisma.authorRequest.create({
        data: {
            userId: userId,
            status: 'PENDING',
        }
        });
    
        res.status(200).json( request );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }

// get all author requests
export const getAuthorRequests = async (req: Request, res: Response): Promise<void> => {
    try {
        const requests = await prisma.authorRequest.findMany({
            select: {
                id: true,
                status: true,
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
        res.status(200).json( requests );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// accept author request
export const acceptAuthorRequest = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const request = await prisma.authorRequest.update({
            where: {
                id: id,
            },
            data: {
                status: 'ACCEPTED',
            },
        });

        if(request){
            const user = await prisma.user.update({
                where: {
                    id: request.userId,
                },
                data: {
                    role: 'AUTHOR',
                },
            });
        }
        res.status(200).json( request );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// reject author request
export const rejectAuthorRequest = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const request = await prisma.authorRequest.update({
            where: {
                id: id,
            },
            data: {
                status: 'REJECTED',
            },
        });
        res.status(200).json({ request });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
