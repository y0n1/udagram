import { Router, Request, Response } from 'express';

import { User } from '../models/User';
import { AuthRouter } from './auth.router';

const router: Router = Router();

router.use('/auth', AuthRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get('/', async (req: Request, res: Response) => { return; });

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await User.findByPk(id);
  res.send(item);
});

export const UserRouter: Router = router;
