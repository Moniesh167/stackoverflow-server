import express from 'express'
import { makeCall } from '../controllers/calls.js';
import auth from '../middleware/auth.js'

const router =express.Router();

router.post('/makecall',auth,makeCall)

export default router