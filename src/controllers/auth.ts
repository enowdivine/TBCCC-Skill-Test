import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
const bcrypt = require("bcrypt");

class Authentication {
  register(req: Request, res: Response) {
    User.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "user already exists",
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err: any, hash: any) => {
            if (err) {
              return res.status(500).json({
                error: err,
              });
            } else {
              const user = new User({
                email: req.body.email,
                password: hash,
              });
              user
                .save()
                .then((result) => {
                  const token: string = jwt.sign(
                    {
                      userId: result._id,
                      email: result.email,
                    },
                    process.env.JWT_SECRET as string
                  );
                  res.status(201).json({
                    message: "Account created",
                    token: token,
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    error: err,
                  });
                });
            }
          });
        }
      });
  }

  login(req: Request, res: Response) {
    User.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Authentication Failed",
          });
        }

        bcrypt.compare(
          req.body.password,
          user[0].password,
          (err: any, result: any) => {
            if (err) {
              return res.status(401).json({
                message: "Authentication Failed",
              });
            }
            if (result) {
              const token: string = jwt.sign(
                {
                  userId: user[0]._id,
                  email: user[0].email,
                },
                process.env.JWT_SECRET as string
              );
              return res.status(200).json({
                message: "Login Successful",
                token: token,
              });
            }
            res.status(401).json({
              message: "Authentication Failed",
            });
          }
        );
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
}

export default Authentication;
