import { Router } from 'express';
import auth from '../middleware/auth.middleware';
import * as WebsiteController from '../controllers/website.controller';
const router = Router();

router.get('/', auth, (req, res) => WebsiteController.getWebsites(req, res));
router.post('/', auth, (req, res) => WebsiteController.createWebsite(req, res));
export default router;
