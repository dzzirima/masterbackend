// this route check the existance of all the routeconst 
import { getPrivateData } from "../controllers/private.js";
import  protectRoute  from '../middleware/auth.js'

import express from "express"

const router = express.Router();


router.route('/').get(protectRoute,getPrivateData)



export default router; 