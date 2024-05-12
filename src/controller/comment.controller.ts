// controller for adding comment in chapter 

import { Request, Response } from "express";
import { prisma } from "..";



export const addComment = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.body, 'woowowowowowowoowow');

        const { comment, type } = req.body;
        const   {commentedItemId } = req.params;
        console.log(req.params);
        const userId = req.user?.id;


        console.log(comment, type, commentedItemId, userId, 'woowowowowowowoowow');

        // Validate the request
        if (!['NOVEL', 'chapter', 'comment', 'series', 'COMIC', 'post'].includes(type)) {
            res.status(400).json({ error: 'Invalid requestxxx' });
            return;
        }

        if (!userId || !type || !commentedItemId || !comment) {
            res.status(400).json({ error: 'Invalid requestoooo' });
            return;
        }

        const addedComment = await prisma.comments.create({
            data: {
                content: comment,
                ...(type === 'NOVEL' && { chapter: { connect: { id: commentedItemId } } }),
                ...(type === 'COMIC' && { comicChapter: { connect: { id: commentedItemId } } }),
                ...(type === 'post' && { post: { connect: { id: commentedItemId } } }),
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });

        if(!addedComment){
            res.status(400).json({ error: 'Invalid requestiiiiii' });
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

    const { itemId, type } = req.params;

    const userId = req.user?.id;

    console.log(itemId, type, userId, 'wooUSERRRR')

    // Validate the request
    if (!['NOVEL', 'COMIC','post'].includes(type)) {
        res.status(400).json({ error: 'Invalid requestxxxxxxx' });
        return;
    }

    if (!userId || !type || !itemId) {
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
        if(type === 'post'){
            const comment = await prisma.comments.findMany({
                where:{
                    postId : itemId
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
                    },
                    Reply:{
                        include:{
                            user: {
                                select: {
                                    username: true,
                                    avatar: true
                
                                }
                            },
                            ...(userId &&
                            {
                                like: {
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
                                    like:true
                                }
                            },
                        }
                    }
                },
              
            })
            console.log(comment, 'comment in novel');
            res.status(200).json(comment);
        }
        else{
            const comment = await prisma.comments.findMany({
                where: {
                    ...(type === "NOVEL" ? { chapterId: itemId } : { comicChapterId: itemId }),
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
        }
        


    } catch (error) {
        console.error('Error fetching comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};