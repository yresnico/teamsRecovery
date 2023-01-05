import { Request, Response } from "express";
import { ControllerHandler } from '../types/appType';
import { getUserOrdersQuery } from '../database/api';

export const getUserOrders: ControllerHandler = (req: Request, res: Response) => {
    const userId = req.body.userid;
    const orders = getUserOrdersQuery(userId)
    console.log(orders);


    orders.then((order) => {

        console.log(order);
        //@ts-ignore
        order.length === 0 ? res.status(401).send({ status: 'fail', message: 'User has no orders' }) : res.status(200).send(order)
    }).catch((error) => {
        res.status(401).send({ status: 'fail', message: error });
    });

    // db.query(
    //     `SELECT * FROM orders WHERE userID = ?;`,
    //     [],
    //     function (err, result) {
    //         if (!err) {
    //             if (result instanceof Array && result.length !== 0) {

    //             } else {
    //                 res.status(401).send({ status: 'fail', message: 'User has no orders' });
    //                 return;
    //             }
    //         } else {

    //             return;
    //         }


    //     }
    // );
};

// export const setUserOrders: ControllerHandler = (req: Request, res: Response) => {
//     db.query(
//         `INSERT INTO orders VALUES(null,?,?,?)`,
//         [req.body.userID, req.body.quantity, req.body.data],
//         function (err, result) {
//             if (!err) {
//                 res.status(200).send({ status: 'success', message: result });
//             } else {
//                 res.status(401).send({ status: 'fail', message: err });
//                 return;
//             }
//         }
//     );
// }

// export const searchUserOrders: ControllerHandler = (req: Request, res: Response) => {

//     const queryData = `%${req.params.id}%`
//     db.query(
//         `SELECT * FROM orders WHERE id LIKE ?`,
//         [queryData],
//         function (err, result) {
//             if (!err) {
//                 res.status(200).send(result)
//             }
//             else {
//                 res.status(401).send({ status: 'fail', message: err });
//                 return;
//             }
//         }
//     )
// };


const ordersController = {
    getUserOrders,
    // setUserOrders,
    // searchUserOrders,
};

export default ordersController;
