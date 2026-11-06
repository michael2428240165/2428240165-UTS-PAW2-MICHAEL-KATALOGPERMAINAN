import express from 'express'

import upload from '../config/upload.js'
import UploadController from '../controllers/upload.controller.js'
import UserController from '../controllers/user.controller.js'
import WelcomeController from '../controllers/welcome.controller.js'
import GameController from '../controllers/game.controller.js'
import logMiddleware from '../middleware/log.middleware.js'

const router = express.Router()

router.get('/welcome', WelcomeController.welcome)
router.post('/users', UserController.store)
router.post('/upload', upload.single('file'), UploadController.store)

router.use(logMiddleware)

router.get('/game', GameController.index)
router.get('/game/:id', GameController.show)
router.post('/game', GameController.store)
router.put('/game/:id', GameController.update)

export default router