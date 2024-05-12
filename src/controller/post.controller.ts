import e, { Request, Response } from 'express';
import { prisma } from '..';


// create new post in forum
export const createPost = async (req: Request, res: Response): Promise<void> => {
    const userId = req?.user?.id;
    const { title, content } = req.body;
    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                userId
            },
            include:{
                user:{
                    select:{
                        id:true,
                        firstName:true,
                        lastName:true,
                        username:true,
                        avatar:true,
                    }
            },
            _count:{
                select:{
                    Likes:true,
                    Comments:true
                }
            },
            ...(userId && {
                Likes: {
                  where:{
                  userId: userId
                  }
                  ,select:{
                    userId: true
                  }
                },
              }),}
        });
        res.status(200).json( post );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//get popular post 
export const getPopularPost = async (req: Request, res: Response): Promise<void> => {
    const { forumId } = req.params;
    const userId = req?.user?.id;
    try {
        const posts = await prisma.post.findMany({
            
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                user:{
                    select:{
                        id:true,
                        firstName:true,
                        lastName:true,
                        username:true,
                        avatar:true
                    }
                
                },
                
                
                _count:{
                    select:{
                        Likes:true,
                        Comments:true
                    }
                },
                ...(userId && {
                    Likes: {
                      where:{
                      userId: userId
                      }
                      ,select:{
                        userId: true
                      }
                    },
                  }),

            }
        });

        const sortedPosts = posts.sort((a, b) => {
            return b._count?.Likes - a._count?.Likes;
        });

        res.status(200).json( sortedPosts );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//get all post from user following 
export const getFollowingPost = async (req: Request, res: Response): Promise<void> => {
    const  userId = req?.user?.id;
    try {
        const posts = await prisma.post.findMany({
            where: {
                user: {
                    Followers: {
                        some: {
                            id: userId
                        }
                    }
                }
            },
            include:{
                
                _count:{
                    select:{
                        Likes:true,
                        Comments:true
                    }
                },
                ...(userId && {
                    Likes: {
                      where:{
                      userId: userId
                      }
                      ,select:{
                        userId: true
                      }
                    },
                  }),
            }
        });
        res.status(200).json( posts );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get all posts in forum
export const getPosts = async (req: Request, res: Response): Promise<void> => {
    const { forumId } = req.params;
    const userId = req?.user?.id;
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
                
                _count:{
                    select:{
                        Likes:true,
                        Comments:true
                    }
                },
                ...(userId && {
                    Likes: {
                      where:{
                      userId: userId
                      }
                      ,select:{
                        userId: true
                      }
                    },
                  }),
                user:{
                    select:{
                        id:true,
                        firstName:true,
                        lastName:true,
                        username:true,
                        avatar:true
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
    const userId = req?.user?.id;
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
                
                _count:{
                    select:{
                        Likes:true,
                        Comments:true
                    }
                },
                ...(userId && {
                    Likes: {
                      where:{
                      userId: userId
                      }
                      ,select:{
                        userId: true
                      }
                    },
                  }),
                user:{
                    select:{
                        id:true,
                        firstName:true,
                        lastName:true,
                        username:true,
                        avatar:true
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

//get post by userId 
export const getPostByUserId = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const id = req?.user?.id;
    try {
        const post = await prisma.post.findMany({
            where: {
                userId
            },
            include:{
                user:{
                    select:{
                        id:true,
                        firstName:true,
                        lastName:true,
                        username:true,
                        avatar:true
                    }
                
                }
                ,
                _count:{
                    select:{
                        Likes:true,
                        Comments:true
                    }
                },
                ...(id && {
                    Likes: {
                      where:{
                      userId: id
                      }
                      ,select:{
                        userId: true
                      }
                    },
                  }),
            }
        });
        res.status(200).json( post );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//get post by Id
export const getPostById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = req?.user?.id;
    try {
        const post = await prisma.post.findUnique({
            where: {
                id
            },
            include:{
                user:{
                    select:{
                        id:true,
                        firstName:true,
                        lastName:true,
                        username:true,
                        avatar:true
                    }
                
                },
                _count:{
                    select:{
                        Likes:true,
                        Comments:true
                    }
                },
                ...(userId && {
                    Likes: {
                      where:{
                      userId: userId
                      }
                      ,select:{
                        userId: true
                      }
                    },
                  }),
                  Comments:{
                        include:{
                            user:{
                                select:{
                                    id:true,
                                    firstName:true,
                                    lastName:true,
                                    username:true,
                                    avatar:true
                                }
                            },
                            _count:{
                                select:{
                                    Likes:true
                                }
                            },
                            ...(userId && {
                                Likes: {
                                where:{
                                userId: userId
                                }
                                ,select:{
                                    userId: true
                                }
                                },
                            }),
                            Reply:{
                                include:{
                                    user:{
                                        select:{
                                            id:true,
                                            firstName:true,
                                            lastName:true,
                                            username:true,
                                            avatar:true
                                        }
                                    },
                                    _count:{
                                        select:{
                                            like:true
                                        }
                                    },
                                    ...(userId && {

                                        like: {
                                        where:{
                                        userId: userId
                                        }
                                        ,select:{
                                            userId: true
                                        }
                                        },
                                    }),
                                }
                            }
                        }
                    
                  }
            }
        });
        res.status(200).json( post );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//get all post 
export const getAllPost = async (req: Request, res: Response): Promise<void> => {
    const userId = req?.user?.id;
    try {
        const post = await prisma.post.findMany({
            include:{
                user:{
                    select:{
                        id:true,
                        firstName:true,
                        lastName:true,
                        username:true,
                        avatar:true
                    }
                
                },
                _count:{
                    select:{
                        Likes:true,
                        Comments:true
                    }
                },
                ...(userId && {
                    Likes: {
                      where:{
                      userId: userId
                      }
                      ,select:{
                        userId: true
                      }
                    },
                  }),
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


