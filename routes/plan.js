import {Router} from 'express'
import { buyPlan, cancelSubscription, getSubscription, resetQuestionLimit } from '../controllers/plan.js'
import auth from '../middleware/auth.js'

const router=Router()
router.post('/buySubscription',auth,buyPlan)
router.get('/getSubscription/',auth,getSubscription)
router.get('/cancelSubscription',auth,cancelSubscription)
router.get('/resetQuestionLimit',resetQuestionLimit)
export default router