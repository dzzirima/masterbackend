// this file will be uses for the configuration of  of routing processs
import express from 'express'
const router = express.Router()

import {register, forgotpassword, resetpassword, login} from '../controllers/auth.js'

router.route("/register").post(register) 
// this is the same  as the following router.post("/register",register)\
router.route("/login").post(login)

router.route("/forgotpassword").post(forgotpassword)
router.route("/resetpassword/:resetToken").put(resetpassword)


export default router