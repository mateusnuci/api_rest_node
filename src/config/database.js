require('dotenv').config();

module.exports = {
  dialect: 'mariadb',
  username: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT || 3306,
  database: process.env.DATABASE_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    'createdAt': 'created_at',
    'updatedAt': 'updated_at',
  },
  dialectOptions: {
    timezone: 'America/Sao_Paulo',
  },
  timezone: 'America/Sao_Paulo'

}
