import { checkHealth } from '@users/controllers/health';
import { Router } from 'express';

const healthRouter = Router();

healthRouter.get('/users-health', checkHealth);

export default healthRouter;
