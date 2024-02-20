import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
//login
export const createNewUser = async (req, res, next) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const user = await prisma.user.create({
      data: {
        userName: req.body.username,
        password: hashedPassword,
      },
    });
    const token = createJWT(user);
    res.json({ token: token, message: "a user has created succesfully" });
  } catch (error) {
    error.type = "input";
    next(error);
    // res.status(500).json({ error: error.message });
  }
};

//sign in

export const signin = async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: {
      userName: req.body.username,
    },
  });
  const isValid = await comparePasswords(req.body.password, user.password);
  if (!isValid) {
    res.status(401);
    res.json({
      massage: "nope you are not authorized please put Token in headers",
    });
    return;
  }
  const token = createJWT(user);
  res.json({ token });
};
