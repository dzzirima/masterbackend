// this route check the existance of all the routeconst 
import { getPrivateData } from "../controllers/private.js";
import express from "express"
const router = express.Router();

router.route('/').get(getPrivateData)



export default router; 