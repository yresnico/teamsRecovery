import express from 'express';
import ordersController from '../../controllers/ordersController';

const ordersRouter = express.Router({ mergeParams: true });

// ordersRouter.route('/userorders').post(ordersController.setUserOrders).get(ordersController.getUserOrders);
// ordersRouter.route('/searchorders/:id').get(ordersController.searchUserOrders);

ordersRouter.route('/userorders').get(ordersController.getUserOrders)

export default ordersRouter;
