export default () => ({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT ?? '', 10) || 3000,
  database: {
    dbHost: process.env.POSTGRE_DB_HOST,
    dbPort: parseInt(process.env.POSTGRE_DB_PORT ?? '', 10) || 5432,
    dbName: process.env.POSTGRE_DB_NAME,
    dbUser: process.env.POSTGRE_DB_USER,
    dbPassword: process.env.POSTGRE_DB_PASSWORD
  }
});