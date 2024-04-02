import { NextFunction, Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { prisma } from '..';
import { KHALTI_SECRET_KEY} from '../../secrets';


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
  
  const KHALTI_S_KEY = KHALTI_SECRET_KEY || '';
  const KHALTI_PRODUCTION_URL = 'https://khalti.com/api/v2';
  
  const khaltiUrl = KHALTI_PRODUCTION_URL;


export const handleKhaltiCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const { txnId, pidx, amount, purchase_order_id, transaction_id, message } = req.query;
      const { pidx, purchase_order_id, status } = req.body.params;
      console.log(req,"reqqqqqqqqq")
      console.log(pidx, purchase_order_id, status, "hehehehehehe")
  
      if (status !== 'Completed') {
        return res.status(400).json({ error: status || 'Error Processing Khalti' });
      }
  
      console.log(pidx, purchase_order_id, status, "111111111")
      if (typeof pidx !== 'string') {
        return res.status(400).json({ error: 'Invalid payment index' });
      }
      console.log(pidx, purchase_order_id, status, "1111111116666666666666")
      const isPidxValid = await prisma.subscription.findUniqueOrThrow({
        where: {
          pidx: pidx,
          id : purchase_order_id as string
        },
      });
      console.log(pidx, purchase_order_id, status, "11111111177777777777")
      if (!isPidxValid) {
        return res.status(400).json({ error: 'Invalid payment index' });
      }
      console.log(pidx, purchase_order_id, status, "1111111118888888888")
      const headers = {
        Authorization: `Key ${KHALTI_S_KEY}`,
        'Content-Type': 'application/json',
      };
      console.log(pidx, purchase_order_id, status, "83838388383")
      const response: AxiosResponse<KhaltiLookupResponse> = await axios.post(`${khaltiUrl}/epayment/lookup/`, { pidx }, { headers });
      
      if (response.data.status !== 'Completed') {
          return res.status(400).json({ error: 'Payment not completed' });
        }
        
        if (typeof purchase_order_id !== 'string') {
            return res.status(400).json({ error: 'Invalid purchase order id' });
        }
        
        console.log(pidx, purchase_order_id, status, "00000000000")
    //   res.status(201); // Issue likely occurs here
      next();
    } catch (error) {
      res.status(400).json({ error: error.message, message: 'Error Processing Khalti'});
    }
  };
  