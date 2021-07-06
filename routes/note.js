// this file will handle all the routing of all the notes
import express from 'express'
const router = express.Router()
import {createPost,createLink, getPosts} from "../controllers/notes.js"


// get  the controller from the controllers


router.route("/createpost").post(createPost)
router.route("createlink").post(createLink)


router.route("/getpost").get(getPosts)

export default router