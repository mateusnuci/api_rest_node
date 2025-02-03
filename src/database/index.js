import Sequelize from 'sequelize';
import Aluno from '../models/Aluno';
import User from '../models/User';
import databaseConfig from '../config/database';

const models = [Aluno, User];
const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));
