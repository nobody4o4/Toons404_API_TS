import { Request, Response } from "express";
import { prisma } from "..";

export const follow = async (req: Request, res: Response): Promise<Response<any>> => {
  const userId = req.user.id;
  const followingId = req.params.userId;

  try {
    if (userId === followingId) {
      return res.status(400).json({ error: 'You cannot follow yourself' });
    }

    if (!userId || !followingId) {
      return res.status(400).json({ error: 'Missing user id or following id' });
    }

    const existingFollow = await prisma.follow.findFirst({
      where: { followerId: userId , followingId: followingId },
    });

    if (!!existingFollow) {
      return res.status(400).json({ error: 'You are already following this user' });
    }

    const follow = await prisma.follow.create({
      data: {
        follower: { connect: { id: userId } },
        following: { connect: { id: followingId } },
      },
    });

    return res.status(200).json(follow);
  } catch (error) {
    console.error('Error following user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const unfollow = async (req: Request, res: Response): Promise<Response<any>> => {
  const userId = req.user.id;
  const followingId = req.params.userId;

  try {
    if (userId === followingId) {
      return res.status(400).json({ error: 'You cannot unfollow yourself' });
    }

    if (!userId || !followingId) {
      return res.status(400).json({ error: 'Missing user id or following id' });
    }

    const existingFollow = await prisma.follow.findFirst({
      where: { followerId: userId, followingId: followingId },
    });

    if (!existingFollow) {
      return res.status(400).json({ error: 'You are not following this user' });
    }

    const follow = await prisma.follow.delete({
      where: { id: existingFollow.id },
    });

    return res.status(200).json(follow);
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};