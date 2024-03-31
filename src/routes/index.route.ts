import { Router, Request, Response } from 'express';
import userRouter from './user.route';
import genreRouter from './genre.route';
import seriesRouter from './series.route';
import novelRouter from './novel.route';
import chapterRouter from './chapter.route';
import dashboardRouter from './dashboard.route';

const rootRouter = Router();

rootRouter.use('/user', userRouter);
rootRouter.use('/genre',genreRouter);
rootRouter.use('/series',seriesRouter);
rootRouter.use('/novel',novelRouter);
rootRouter.use('/chapter',chapterRouter);
rootRouter.use('/dashboard',dashboardRouter);


export default rootRouter;

