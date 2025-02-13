import Student from '../models/Student';
import Photo from '../models/Photo';

class StudentController {

  async index(req, res) {
    try {
      const students = await Student.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
          attributes: ['url', 'filename']
        }
      });
      console.log("Students encontrados:", students);

      res.status(200).json(students)
    } catch (e) {
      const errors = e.errors ? e.errors.map(err => err.message) : ["An unexpected error occurred"];
      res.status(400).json({ errors });
    }
  }

  async show(req, res) {
    try {
      const student = await Student.findByPk(req.params.id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
          attributes: ['url','filename']
        }
      })
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(201).json(student)
    } catch (e) {
      res.status(400).json(e.errors.map(err => err.message))
    }
  }

  async store(req, res) {
    try {
      const newStudent = await Student.create(req.body)
      res.status(201).json(newStudent)
    } catch (e) {
      console.error("Erro ao criar estudantes:", e.name, e.message, e.stack);
      res.status(500).json({ errors: [e.message || "Erro inesperado"] });
    }
  }

  async delete(req, res) {
    await Student.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).json('student deleted')
  }

  async update(req, res) {
    try {
      const student = await Student.findByPk(req.params.id)
      if (!student) {
        return res.status(404).json({ message: "resource not found" })
      }
      const updatedStudent = await student.update(req.body)
      res.status(200).json(updatedStudent)
    } catch (e) {
      if (e.name == "SequelizeUniqueConstraintError") {
        const messages = e.errors.map(err => err.message);
        return res.status(409).json({ errors: messages });
      } else {
        res.status(500).json({ message: "an unexpected error occurred" })
      }
    }
  }
}

export default new StudentController();
