import { Request, Response } from "express";
import { ControllerHandler } from '../types/appType';
import { db } from '../../server';

export const getUserOrders: ControllerHandler = (req: Request, res: Response) => {
    console.log(req.session);
    db.query(
        `SELECT * FROM orders WHERE userID = ?;`,
        [req.body.userID],
        function (err, result) {
            if (!err) {
                if (result instanceof Array && result.length !== 0) {
                    req.body.orders = result;
                } else {
                    res.status(401).send({ status: 'fail', message: 'User has no orders' });
                    return;
                }
            } else {
                res.status(401).send({ status: 'fail', message: err });
                return;
            }
        }
    );
};

export const setUserOrders: ControllerHandler = (req: Request, res: Response) => {
    db.query(
        `INSERT INTO orders VALUES(null,?,?,?)`,
        [req.body.userID, req.body.quantity, req.body.data],
        function (err, result) {
            if (!err) {
                res.status(200).send({ status: 'success', message: result });
            } else {
                res.status(401).send({ status: 'fail', message: err });
                return;
            }
        }
    );
}

export const searchUserOrders: ControllerHandler = (req: Request, res: Response) => {
    db.query(
        `SELECT * FROM orders WHERE id LIKE %?%`,
        [req.body.id],
        function (err, result) {
            if (!err) {
                req.body.result = result;
            }
            else {
                res.status(401).send({ status: 'fail', message: err });
                return;
            }
        }
    )
};


const ordersController = {
    getUserOrders,
    setUserOrders,
    searchUserOrders,
};

export default ordersController;
