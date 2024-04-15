import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { prisma } from '..';


interface KhaltiPaymentResponse {
  pidx: string;
  payment_url: string;
  expires_at: string;
  expires_in: number;
}

interface KhaltiLookupResponse {
  pidx: string;
  total_amount: number;
  status: string;
  transaction_id: string | null;
  fee: number;
  refunded: boolean; 
}

const KHALTI_S_KEY = process.env.KHALTI_SECRET_KEY || '';
const KHALTI_API_URL = 'https://khalti.com/api/v2';

export const getSubscriptions = async (req: Request, res: Response) => {
  try {
    const subscriptions = await prisma.subscription.findMany();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSubscription = async (req: Request, res: Response) => {
  try {
    const planId = "b14b54ca-47a3-499a-84d4-a04d32a94ecf";
    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) {
      throw new Error('Plan not found');
    }

    const subscription = await prisma.subscription.create({
      data: {
        userId: req.user.id,
        planId,
        status: 'PENDING',
        startDate: new Date(),
        endDate: calculateEndDate(plan.billingInterval),
      },
    });

    const subscriptionId = subscription.id;

    const formData = {
      return_url: "http://localhost:4004/subscribtion/success",
      website_url:"http://localhost:4004",
      amount: plan.price * 100,
      purchase_order_id: subscriptionId,
      purchase_order_name: "Subscription Premium",
    };

    const headers = {
      Authorization: `Key ${KHALTI_S_KEY}`,
      'Content-Type': 'application/json',
    };
    const response: AxiosResponse<KhaltiPaymentResponse>  = await axios.post(`${KHALTI_API_URL}/epayment/initiate/`, formData, { headers });   

    await prisma.subscription.update({
      where: { id: subscriptionId },
      data:{
        pidx : response.data.pidx
      }
    })

    res.status(201).json({
      message: 'Subscription created successfully',
      subscription,
      payment_method: 'khalti',
      data: response.data,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const updateSubscriptionAfterPayment = async (req: Request, res: Response) => {
  try {
    const { pidx, status } = req.body.params;

    const headers = {
      Authorization: `Key ${KHALTI_S_KEY}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.post(`${KHALTI_API_URL}/epayment/lookup/`, { pidx }, { headers });

    if (status as string !== 'Completed' || response.data.status !== 'Completed') {
      return res.status(400).json({ error: 'Payment not completed' });
    }
    // const pidx : string = response.data.pidx;
    await prisma.subscription.update({
      where: { pidx: response.data.pidx  },
      data: { status: 'ACTIVE' },
    });

    res.status(201).json('success');

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Error Processing Khalti' });
  }
};

//check id user has active subscription
export const getSubscriptionByUserId =  async  (req: Request, res:Response ) => {

  const userId = req.user.id

  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: userId,
      status: 'ACTIVE',
    },

  });

  if(!subscription){
    return res.status(400).json({message: 'No active subscription found'});
  }

  res.status(200).json({subscription,message:"Active"});

}

const calculateEndDate = (billingInterval: 'MONTH' | 'YEAR'): Date => {
  const today = new Date();
  return billingInterval === 'MONTH'
    ? new Date(today.setMonth(today.getMonth() + 1))
    : new Date(today.setFullYear(today.getFullYear() + 1));
};
