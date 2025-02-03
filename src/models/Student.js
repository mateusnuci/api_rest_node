import Sequelize, { Model } from 'sequelize';


export default class Student extends Model { // config do sequelize

  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
      sobrenome: Sequelize.STRING,
      email: Sequelize.STRING,
      idade: Sequelize.INTEGER,
      peso: Sequelize.FLOAT,
      altura: Sequelize.FLOAT
    },
    {sequelize});
    return this;
  }
}
