import { Request, Response, NextFunction } from "express";
import { prisma } from "../index";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../secrets";
import bcrypt from 'bcrypt';
import { BadRequestException } from "../middleware/errors/badRequest";
import { ErrorCodes } from "../middleware/errors/index.error";



// Define a custom interface to extend the Request interface
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // RegisterValidator.parse(req.body);
    const { firstName, lastName, username, email, password } = req.body;
    const image = req.upload_urls?.Single_file;
    let user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      next(new BadRequestException('User already exist!', ErrorCodes.USER_NOT_FOUND, null))
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        avatar: image
      },
    });

    console.log(user, "User registered");
    res.status(200).json(user);
    console.log(user, "User registered");
  } catch (error) {
    next(error);
  }
};

export const getUserProfileByUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        avatar: true,
      }
    });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getCurrentUserProfile = async (req: Request, res: Response) => {
  try {
    const { username } = req.user;
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        avatar: true,
        bio: true,
        _count: {
          select: {
            Followers: true,
            Followings: true,
          }
        },
        novels: {
          select: {
            id: true,
            title: true,
            coverImage: true,
            genre: {
              select: {
                name: true
              }
            },
            subGenre: {
              select: {
                name: true
              }
            },
            series: {
              select: {
                title: true
              }
            }
          }

        },
      }
    });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getUserProfile = async (req: Request, res: Response) => {
  const { username } = req.params;
  const userId = req.user.id;

  try {
    const userData = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        avatar: true,
        bio: true,
        _count: {
          select: {
            Followers: true,
            Followings: true,
          },
        },
        novels: {
          select: {
            id: true,
            title: true,
            coverImage: true,
            genre: {
              select: {
                name: true,
              },
            },
            subGenre: {
              select: {
                name: true,
              },
            },
            series: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isFollowing = await prisma.user.findFirst({
      where: {
        Followings: {
          some: {
            followingId: userData.id,
          },
        },
      },
    });

    console.log(isFollowing, "isFollowing djhchjsdbchjdsbhjbdchj")

    const user = {
      ...userData,
      isFollowing: !!isFollowing,
    };

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update current user profile
// export const updateCurrentUserProfile = async (req: Request, res: Response) => {
//   try {
//     const { username } = req.user;
//     const image = req.upload_urls?.Single_file;
//     const { firstName, lastName, email, bio } = req.body;
//     const user = await prisma.user.update({
//       where: { username },
//       data: {
//         avatar: image,
//         firstName,
//         lastName,
//         bio,
//       },
//     });
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "User doesn't exist" });
    }

    const isPasswordValid = (await bcrypt.compare(password, user.password));
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Return limited user data and token as JSON response
    const limitedUserData = {
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    // Return limited user data and token as JSON response
    res.json({ user: user, token, Avatar: user });

  } catch (error) {
    // Handle errors gracefully
    res.status(500).json({ error: error.message });
  }
};


// Change the type of req to CustomRequest
export const me = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(400).json({ error: "User not found" });
    }
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const data = req.user;
    console.log(data, "samir")
    const id = req.user.id;
    const user = await prisma.user.findUnique({
      where: { id: (id) }, select: {
        role: true
      }
    });

    // if(user.role === "ADMIN"){
    //   res.json({isAdmin:true});
    // }else{
    //   res.json({isAdmin:false});
    // }
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    console.log(user.role, "mrbes=asttt")
    res.json(user.role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: (id) },
      select: {
        id: true,
        avatar: true,
        firstName: true,
        lastName: true,
        username: true,
        role: true,
        email: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            Followers: true,
            Followings: true,
            novels: true,
            Series: true
          }
        },
        novels: {
          select: {
            id: true,
            title: true,
            coverImage: true,
            genre: {
              select: {
                name: true
              }
            },
            subGenre: {
              select: {
                name: true
              }
            },
            series: {
              select: {
                title: true
              }
            }
          }
        },

        Series:{
          select: {
            id: true,
            title: true,
            coverImage: true,
            novels: {
              select: {
                id: true,
                title: true,
                coverImage: true,
                genre: {
                  select: {
                    name: true
                  }
                },
                subGenre: {
                  select: {
                    name: true
                  }
                },
                series: {
                  select: {
                    title: true
                  }
                }
              }
            }
          }
        }

      }
    });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const image = req.upload_urls?.Single_file;
    const { id } = req.user;
    const { firstName, lastName, username, bio } = req.body;
    const user = await prisma.user.update({
      where: { id: (id) },
      data: {
        avatar: image,
        firstName,
        lastName,
        username,
        bio,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({ where: { id: (id) } });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        avatar: true,
        firstName: true,
        lastName: true,
        username: true,
        role: true,
        email: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            Followers: true,
            Followings: true,
            novels: true,
            Series: true
          }
        },

      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
