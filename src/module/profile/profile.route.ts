import { Router } from 'express';
import { profileController } from './profile.controller';
const router = Router();


// post 
router.post("/", profileController.createProfile)









export const profileRoute = router;