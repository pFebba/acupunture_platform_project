import configuration from './configuration';

describe('configuration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.PORT;
    delete process.env.POSTGRE_DB_PORT;
    delete process.env.JWT_EXPIRES_IN;
    delete process.env.NODE_ENV;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('usa valores padrão quando as variáveis não estão definidas', () => {
    const config = configuration();

    expect(config.port).toBe(3000);
    expect(config.database.port).toBe(5432);
    expect(config.jwt.expiresIn).toBe('1h');
    expect(config.database.synchronize).toBe(false);
  });

  it('lê os valores das variáveis de ambiente', () => {
    process.env.PORT = '8080';
    process.env.POSTGRE_DB_PORT = '6543';
    process.env.POSTGRE_DB_HOST = 'db.local';
    process.env.POSTGRE_DB_NAME = 'acupuntura';
    process.env.JWT_SECRET = 'segredo';
    process.env.JWT_EXPIRES_IN = '2h';
    process.env.AUTH_ENABLED = 'true';

    const config = configuration();

    expect(config.port).toBe(8080);
    expect(config.jwt).toEqual({ secret: 'segredo', expiresIn: '2h' });
    expect(config.database).toMatchObject({
      type: 'postgres',
      host: 'db.local',
      port: 6543,
      database: 'acupuntura',
      autoLoadEntities: true,
    });
    expect(config.auth.isEnabled).toBe('true');
  });

  it('cai no padrão quando a porta não é numérica', () => {
    process.env.PORT = 'abc';
    process.env.POSTGRE_DB_PORT = 'xyz';

    const config = configuration();

    expect(config.port).toBe(3000);
    expect(config.database.port).toBe(5432);
  });

  it('só habilita synchronize no ambiente local', () => {
    process.env.NODE_ENV = 'local';
    expect(configuration().database.synchronize).toBe(true);

    process.env.NODE_ENV = 'production';
    expect(configuration().database.synchronize).toBe(false);
  });
});
