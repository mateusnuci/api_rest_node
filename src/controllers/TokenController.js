import User from '../models/User';
import jwt from 'jsonwebtoken';

class TokenController {

  async store(req, res) {
    const { email = '', password = '' } = req.body;
    if (!email || !password) {
      return res.status(401).json("invalid data");
    }
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "resource not found" });

    if (!(await user.passwordIsValid(password))) return res.status(401).json({ message: "incorrect password" });

    const {id} = user;

    const token = jwt.sign({ id, email}, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_EXPIRATION});

    res.json({token});
  }

}

export default new TokenController();
