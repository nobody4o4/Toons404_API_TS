import { Router, Request, Response } from 'express';
import userRouter from './user.route';
import genreRouter from './genre.route';
import seriesRouter from './series.route';
import bookRouter from './book.route';
import chapterRouter from './chapter.route';
import dashboardRouter from './dashboard.route';
import subscriptionRouter from './subscription.route';
import likesRouter from './like.route';
import commentRouter from './comment.route';
import followRouter from './follow.route';
import historyRouter from './history.route';
import requestRouter from './request.route';
import clubRouter from './club.route';
import postRouter from './post.route';
import { subscriptionMiddleware } from '../middleware/auth.middleware';
import replyRouter from './reply.route';
import planRouter from './plan.route';

const rootRouter = Router();

rootRouter.use('/user', userRouter);
rootRouter.use('/genre',genreRouter);
rootRouter.use('/series',seriesRouter);
rootRouter.use('/book',bookRouter);
rootRouter.use('/chapter',chapterRouter);
rootRouter.use('/dashboard',dashboardRouter);
rootRouter.use('/subscription',subscriptionRouter);
rootRouter.use('/like', likesRouter)
rootRouter.use('/comment', commentRouter)
rootRouter.use('/follow', followRouter)
rootRouter.use('/history', historyRouter)
rootRouter.use('/request', requestRouter)
rootRouter.use('/post', postRouter)
rootRouter.use('/reply', replyRouter)
rootRouter.use('/plan',planRouter)
rootRouter.use('/club', clubRouter)


export default rootRouter;

