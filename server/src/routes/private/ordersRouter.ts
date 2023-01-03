import express from 'express';
import ordersController from '../../controllers/ordersController';

const ordersRouter = express.Router({ mergeParams: true });

ordersRouter.route('/').post().get(ordersController.getUserOrders);
ordersRouter.route('/:id').get()


// console.log(authRouter.stack);

export default ordersRouter;
