// controller for adding comment in chapter 

import { Request, Response } from "express";
import { prisma } from "..";



export const addComment = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.body, 'woowowowowowowoowow');

        const { comment, type } = req.body;
        const { chapterId } = req.params;
        const userId = req.user?.id;

        // Validate the request
        if (!['NOVEL', 'chapter', 'comment', 'series', 'COMIC'].includes(type)) {
            res.status(400).json({ error: 'Invalid request' });
            return;
        }

        if (!userId || !type || !chapterId || !comment) {
            res.status(400).json({ error: 'Invalid request' });
            return;
        }

        const addedComment = await prisma.comments.create({
            data: {
                content: comment,
                ...(type === 'NOVEL' && { chapter: { connect: { id: chapterId } } }),
                ...(type === 'COMIC' && { ComicChapter: { connect: { id: chapterId } } }),
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });

        if(!addedComment){
            res.status(400).json({ error: 'Invalid request' });
            return;
        }

        const commentDetails = await prisma.comments.findUnique({
            where: {
                id: addedComment.id,
            },
            include: {
                user: {
                    select: {
                        username: true,
                        avatar: true

                    }
                }
                ,
                ...(userId &&
                {
                    Likes: {
                        where: {
                            userId: req.user?.id
                        },
                        select: {
                            userId: true
                        }
                    }
                }
                ),
                _count: {
                    select: {
                        Likes: true,
                    }
                }
            }
        });

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                username: true,
                avatar: true,
            },
        });

        const addedCommentDetails = { ...addedComment, user };


        res.status(201).json(commentDetails);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//controller for removing comment from chapter
export const removeComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
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
        const userId = req.user?.id;
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
    console.log(req.params, 'woowowowowowowoowow');

    const { chapterId, type } = req.params;
    const userId = req.user?.id;

    console.log(chapterId, type, userId, 'wooUSERRRR')

    // Validate the request
    if (!['NOVEL', 'COMIC'].includes(type)) {
        res.status(400).json({ error: 'Invalid requestxxxxxxx' });
        return;
    }

    if (!userId || !type || !chapterId) {
        res.status(400).json({ error: 'Invalid requestsssss' });
        return;
    }



    try {
        // if (type === 'NOVEL') {
        //     const comment = await prisma.comments.findMany({
        //         where: {
        //             ...(type === "NOVEL" ? { chapterId: chapterId } : { comicChapterId: chapterId }),
        //         },
        //         include: {
        //             user: {
        //                 select: {
        //                     username: true,
        //                     avatar: true

        //                 }
        //             }
        //             ,
        //             ...(userId &&
        //             {
        //                 Likes: {
        //                     where: {
        //                         userId: req.user?.id
        //                     },
        //                     select: {
        //                         userId: true
        //                     }
        //                 }
        //             }
        //             ),
        //             _count: {
        //                 select: {
        //                     Likes: true,
        //                 }
        //             }
        //         }
        //     });
        //     console.log(comment, 'comment in novel');
        //     res.status(200).json(comment);
        // } 
        // else if (type === 'COMIC')
        //     {
        //     const comment = await prisma.comments.findMany({
        //         where: {
        //             comicChapterId: chapterId
        //         },
        //         include: {
        //             user: {
        //                 select: {
        //                     username: true,
        //                     avatar: true

        //                 }
        //             }
        //             ,
        //             ...(userId &&
        //             {
        //                 Likes: {
        //                     where: {
        //                         userId: req.user?.id
        //                     },
        //                     select: {
        //                         userId: true
        //                     }
        //                 }
        //             }
        //             ),
        //             _count: {
        //                 select: {
        //                     Likes: true,
        //                 }
        //             }
        //         }
        //     });
        //     console.log(comment, 'comment in comic');
        //     res.status(200).json(comment);
        // }
        const comment = await prisma.comments.findMany({
            where: {
                ...(type === "NOVEL" ? { chapterId: chapterId } : { comicChapterId: chapterId }),
            },
            include: {
                user: {
                    select: {
                        username: true,
                        avatar: true

                    }
                }
                ,
                ...(userId &&
                {
                    Likes: {
                        where: {
                            userId: req.user?.id
                        },
                        select: {
                            userId: true
                        }
                    }
                }
                ),
                _count: {
                    select: {
                        Likes: true,
                    }
                }
            }
        });
        console.log(comment, 'comment in novel');
        res.status(200).json(comment);


    } catch (error) {
        console.error('Error fetching comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};