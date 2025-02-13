import dotenv from 'dotenv';
dotenv.config();

import { resolve } from 'path'
import './src/database'; // importando o arquivo de connection
import express from 'express';
import homeRoutes from './src/routes/homeRoutes';
import userRoutes from './src/routes/userRoutes';
import studentRoutes from './src/routes/studentRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import photoRoutes from './src/routes/photoRoutes';



class App { // classe p configuração do express
  constructor() {
    this.app = express(); // express
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(resolve(__dirname, 'uploads'))) // documentar
  }

  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/users", userRoutes);
    this.app.use("/tokens", tokenRoutes);
    this.app.use("/students", studentRoutes);
    this.app.use("/photos", photoRoutes);
  }


}

export default new App().app; // exportando o express
