import User from '../models/User';

class UserController {

  async index(req, res) {
    try {
    const users = await User.findAll();
    res.status(200).json(users)
    } catch (e) {
      res.status(400).json(e.errors.map(err => err.message))
    }
  }

  async store(req, res) {
    try {
      const newUser = await User.create({
        nome: req.body.nome,
        email: req.body.email,
        password: req.body.password
      })
      res.status(201).json(newUser)
    } catch (e) {
      res.status(400).json(e.errors.map(err => err.message))
    }
  }

  // async show(req, res) {
  //   try {
  //     const {id} = req.params
  //     const user = await User.findByPk(id)
  //     res.status(201).json(user)
  //   } catch (e) {
  //     res.status(400).json(e.errors.map(err => err.message))
  //   }
  // }

  async delete(req, res) {
    await User.destroy({
      where: {
        id: req.userId
      }
    })
    res.status(204).json('user deleted')
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId)
      if (!user) {
        return res.status(400).json({message: "resource not found"})
      }
      const updatedUser = await user.update(req.body)
      res.status(200).json(updatedUser)
    } catch (e) {
      if (e.name == "SequelizeUniqueConstraintError") {
        const messages = e.errors.map(err => err.message);
        return res.status(409).json({ errors: messages });
      } else {
        res.status(500).json({message: "an unexpected error occurred"})
      }
    }
  }

}

export default new UserController();
