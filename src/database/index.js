import Sequelize from 'sequelize';
import Student from '../models/Student';
import User from '../models/User';
import Photo from '../models/Photo'
import databaseConfig from '../config/database';

const models = [Student, User, Photo];
const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));
models.forEach(model => model.associate && model.associate(connection.models)); // short circuit
