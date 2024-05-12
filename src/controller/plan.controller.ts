import { Request, Response } from "express";
import { prisma } from "..";
// controller to get all plans
export const getPlans = async (req: Request, res: Response): Promise<void> => {
  try {
    const plans = await prisma.plan.findMany();
    res.status(200).json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};