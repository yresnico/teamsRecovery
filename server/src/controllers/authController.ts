import { ControllerHandler } from "../types/appType";
import { db } from "../database/api";
import { queryEmail, queryUser, updateUserInfo } from "../database/authDBHandlers";
import { resourceLimits } from "worker_threads";
//Checks if username exist in database, true if username exist, otherwise false.

const checkUserName: ControllerHandler = async (req, res) => {
  const username = req.body.username;
  if (!username) {
    res
      .status(402)
      .send({ status: "fail", message: "Username was not provided" });
    return;
  }
  try {
    const user = await queryUser(username);
    if (user[0].username === username) {
      res.status(200).send({
        status: "succses",
        data: true,
      });
      return;
    } else {
      res.status(400).send({
        status: "succses",
        data: false,
      });
      return;
    }
  } catch (error) {
    res.status(502).send({
      status: "fail",
      message: error,
    });
  }
};

const checkEmail: ControllerHandler = async (req, res) => {
  const email = req.body.email 
  if (!email) {
    res.status(402).send({ status: "fail", message: "Email was not provided" });
    return;
  }

  try {
    const user = await queryEmail(email);
    if (user[0].email === email) {
      res.status(200).send({
        status: "succses",
        data: true,
      });
      return;
    } else {
      res.status(400).send({
        status: "succses",
        data: false,
      });
      return;
    }
  } catch (error) {
    res.status(502).send({
      status: "fail",
      message: error,
    });
  }
  
};

const updateUser: ControllerHandler = async (req, res) => {
  const password = req.body.password
  const username = req.body.username;
  const email = req.body.email 

  const result = await updateUserInfo(username, password, email)
// @ts-ignore
  if (result.changedRows !== 0) {
    const user = await queryEmail(email)
    res.status(200).send({
      status: "succses",
      data: user[0],
    });
  } else {
    res.status(402).send({ status: "fail", message: "incorrect data" });
    return;
  }
 
};

const authController = {
  checkUserName,
  checkEmail,
  updateUser,
};

export default authController;
