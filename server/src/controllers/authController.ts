import { ControllerHandler } from "../types/appType";
import { db } from "../../server";
//Checks if username exist in database, true if username exist, otherwise false.

const checkUserName: ControllerHandler = (req, res) => {
  if (!req.body.username) {
    res
      .status(401)
      .send({ status: "fail", message: "Username was not provided" });
    return;
  }
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [req.body.username],
    (err, result) => {
      res.status(200).send({
        status: "succses",
        data: !(Object.values(JSON.parse(JSON.stringify(result))).length === 0),
      });
    }
  );
};

const checkEmail: ControllerHandler = (req, res) => {
  if (!req.body.email) {
    res.status(401).send({ status: "fail", message: "Email was not provided" });
    return;
  }
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [req.body.email],
    (err, result) => {
      res.status(200).send({
        status: "succses",
        data: !(Object.values(JSON.parse(JSON.stringify(result))).length === 0),
      });
    }
  );
};

const updateUser: ControllerHandler = (req, res) => {
  db.query(
    "UPDATE users SET username = ?, password = ? WHERE email = ?;",
    [req.body.username, req.body.password, req.body.email],
    (err, result) => {
      if (err) {
        res.status(401).send({ status: "fail", message: err });
      }
      res.status(200).send({
        status: "succses",
        data: !(Object.values(JSON.parse(JSON.stringify(result))).length === 0),
      });
    }
  );
};

const authController = {
  checkUserName,
  checkEmail,
  updateUser,
};

export default authController;
