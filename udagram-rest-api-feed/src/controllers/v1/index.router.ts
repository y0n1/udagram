import { Router } from 'express';
import { FeedRouter } from './feed/routes/feed.router';

const router: Router = Router();

router.use('/feed', FeedRouter);

router.get('/', async (_req, res) => {    
    res.send('v1');
});

export const IndexRouter: Router = router;