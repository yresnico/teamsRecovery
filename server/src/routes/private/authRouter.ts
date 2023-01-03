import express from 'express';
import authController from '../../controllers/authController';

const authRouter = express.Router({mergeParams: true});

authRouter.route('/username').get(authController.checkUserName)
authRouter.route('/email').get(authController.checkEmail)
authRouter.route('/login').post()


export default authRouter;
