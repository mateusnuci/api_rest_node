class StudentController {
  async index(req, res) {

    res.json({
      "message": "Hello World"
    });
  }
}

export default new StudentController();
