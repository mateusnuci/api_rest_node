import dotenv from 'dotenv';
dotenv.config();

import './src/database'; // importando o arquivo de connection
import express from 'express';
import homeRoutes from './src/routes/homeRoutes';
import userRoutes from './src/routes/userRoutes';
import studentRoutes from './src/routes/studentRoutes';
import tokenRoutes from './src/routes/tokenRoutes';


class App { // classe p configuração do express
  constructor() {
    this.app = express(); // express
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/users", userRoutes);
    this.app.use("/tokens", tokenRoutes);
    this.app.use("/students", studentRoutes);
  }


}

export default new App().app; // exportando o express
