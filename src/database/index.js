import Sequelize from 'sequelize';
import Student from '../models/Student';
import User from '../models/User';
import databaseConfig from '../config/database';

const models = [Student, User];
const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));
