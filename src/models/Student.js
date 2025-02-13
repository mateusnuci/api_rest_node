import Sequelize, { Model } from 'sequelize';

export default class Student extends Model {

  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo sobrenome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: "Email já existe"
        },
        validate: {
          isEmail: {
            msg: 'Email invalido',
          },
        }
      },
      idade: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: "Idade precisa ser um número inteiro"
          }
        }
      },
      peso: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: "Peso precisa ser um número valido"
          }
        }

      },
      altura: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: "Altura precisa ser um número valido"
          }
        }

      },
    },
      { sequelize });
    return this;
  }
  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'student_id'})
  }
}
