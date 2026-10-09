export default () => ({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT ?? '', 10) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
  },
  database: {
    type: 'postgres',
    host: process.env.POSTGRE_DB_HOST,
    port: parseInt(process.env.POSTGRE_DB_PORT ?? '', 10) || 5432,
    database: process.env.POSTGRE_DB_NAME,
    username: process.env.POSTGRE_DB_USER,
    password: process.env.POSTGRE_DB_PASSWORD,
    autoLoadEntities: true,
    synchronize: process.env.NODE_ENV === 'local',
  }
});