// // controllers/khaltiPaymentController.ts
// import { NextFunction, Request, Response } from 'express';
// import axios, { AxiosResponse } from 'axios';
// import { PrismaClient } from '@prisma/client';
// import { KHALTI_SECRET_KEY, NODE_ENV } from '../../secrets';

// const prisma = new PrismaClient();

// interface KhaltiPaymentResponse {
//   pidx: string;
//   payment_url: string;
//   expires_at: string;
//   expires_in: number;
// }

// interface KhaltiLookupResponse {
//   pidx: string;
//   total_amount: number;
//   status: string;
//   transaction_id: string | null;
//   fee: number;
//   refunded: boolean;
// }

// const KHALTI_S_KEY = KHALTI_SECRET_KEY || '';
// const KHALTI_PRODUCTION_URL = 'https://khalti.com/api/v2';

// const khaltiUrl = KHALTI_PRODUCTION_URL;

// export const initiateKhaltiPayment = async (req: Request, res: Response) => {
//   try {
//     const { userId, planId } = req.body;

//     // Get the user and plan details
//     const user = await prisma.user.findUnique({
//       where: {
//         id: userId,
//       },
//     });

//     const plan = await prisma.plan.findUnique({
//       where: {
//         id: planId,
//       },
//     });

//     if (!user || !plan) {
//       return res.status(400).json({ error: 'Invalid user or plan' });
//     }

//     const formData = {
//       return_url: `${req.protocol}://${req.get('host')}/khalti/callback`,
//       website_url: process.env.APP_URL,
//       amount: plan.price * 100, // Amount in Paisa
//       purchase_order_id: `${userId}-${planId}`,
//       purchase_order_name: plan.name,
//     };

//     const headers = {
//       Authorization: `Key ${KHALTI_S_KEY}`,
//       'Content-Type': 'application/json',
//     };

//     console.log(headers, "hehehehehehe")

//     const response: AxiosResponse<KhaltiPaymentResponse> = await axios.post(`${khaltiUrl}/epayment/initiate/`, formData, {
//       headers,
//     });

//     res.status(200).json(response.data);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const handleKhaltiCallback = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // const { txnId, pidx, amount, purchase_order_id, transaction_id, message } = req.query;
//     const { pidx, purchase_order_id, status } = req.body.params;
//     console.log(req,"reqqqqqqqqq")
//     console.log(pidx, purchase_order_id, status, "hehehehehehe")

//     if (status) {
//       return res.status(400).json({ error: status || 'Error Processing Khalti' });
//     }

//     if (typeof pidx !== 'string') {
//       return res.status(400).json({ error: 'Invalid payment index' });
//     }

//     const isPidxValid = await prisma.subscription.findUniqueOrThrow({
//       where: {
//         pidx: pidx,
//         id : purchase_order_id as string
//       },
//     });

//     if (!isPidxValid) {
//       return res.status(400).json({ error: 'Invalid payment index' });
//     }

//     const headers = {
//       Authorization: `Key ${KHALTI_S_KEY}`,
//       'Content-Type': 'application/json',
//     };

//     const response: AxiosResponse<KhaltiLookupResponse> = await axios.post(`${khaltiUrl}/epayment/lookup/`, { pidx }, { headers });

//     if (response.data.status !== 'Completed') {
//       return res.status(400).json({ error: 'Payment not completed' });
//     }

//     if (typeof purchase_order_id !== 'string') {
//       return res.status(400).json({ error: 'Invalid purchase order id' });
//     }

//     // res.status(201).json(newSubscription); // Issue likely occurs here
//     next();
//   } catch (error) {
//     res.status(400).json({ error: error.message, message: 'Error Processing Khalti'});
//   }
// };


// const calculateEndDate = async (planId: string) => {
//   const plan = await prisma.plan.findUnique({
//     where: {
//       id: planId,
//     },
//   });

//   if (!plan) {
//     throw new Error('Plan not found');
//   }

//   const today = new Date();
//   if (plan.billingInterval === 'MONTH') {
//     return new Date(today.setMonth(today.getMonth() + 1));
//   } else {
//     return new Date(today.setFullYear(today.getFullYear() + 1));
//   }
// };