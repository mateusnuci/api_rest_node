import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

export default class User extends Model {


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
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'Email invalido',
          },
        }

      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: { // nao vai existir na base de dados
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          isStrongPassword: {
            msg: 'Senha precisa ter 8 caracteres, uma letra maiuscula, uma minuscula, um numero e um caractere especial',
          }

        }
      }
    },
    {sequelize});
    // gancho para executar algo antes de salvar
    this.addHook('beforeSave', async (user) => {
      if (user.password) { // evita tentar hashear null
        user.password_hash = await bcrypt.hash(user.password, 8);
      }

    });
    return this;
  }

  passwordIsValid(password) {
    return bcrypt.compare(password, this.password_hash)
  }
}
