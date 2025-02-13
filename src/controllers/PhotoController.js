import Photo from '../models/Photo'
import Student from '../models/Student'
import multer from 'multer';
import multerConfig from '../config/multer'
const upload = multer(multerConfig).single("photo")

class PhotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        res.status(400).json({ message: [error.code] })
      }
      try {
        if(!req.file) res.status(400).json({ message : 'no file sended'})
        const { originalname, filename } = req.file
        const { student_id } = req.body
        if(!await Student.findByPk(student_id)) res.status(404).json({message: 'id doesnt exists'})
        console.log(req.params);
        console.log(req.file);

        const photo = await Photo.create({originalname, filename, student_id })
        res.status(201).json(photo)
      } catch (e) {
        res.status(500).json({ errors: [e.message || "Unexpected error"] });
      }


    })
  }
}

export default new PhotoController();
