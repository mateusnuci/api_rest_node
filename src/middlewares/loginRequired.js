import jwt from "jsonwebtoken";
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json("login required");

  const [, token] = authorization.split(" ");

  try {
    const { id, email } = jwt.verify(token, process.env.TOKEN_SECRET); // dados retornados
    const user = await User.findOne({
      where: {
        id,
        email,
      }
    })

    if(!user) return res.json("invalid token")

    req.userId = id;
    req.userEmail = email; // dados sao adicionados no objeto req 
    return next();
  } catch (e) {
    res.status(401).json(e.errors.map((err) => err.message));
  }
};
