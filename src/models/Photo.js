import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig'


export default class Photo extends Model {

  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode estar vazio',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode estar vazio'
          },
        },
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'O ID do estudante é obrigatório',
          },
        },
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('filename')}`
        }

      }
    },
    {sequelize});
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id'})
  }
}
