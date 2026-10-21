// Stub de @nestjs/authentication para testes unitários.
// O pacote real é ESM puro e não roda no Jest em modo CommonJS.
export class PasswordHasher {
  hash(_password: string): Promise<string> {
    throw new Error('PasswordHasher.hash deve ser mockado no teste');
  }

  verify(_password: string, _hash: string): boolean | Promise<boolean> {
    throw new Error('PasswordHasher.verify deve ser mockado no teste');
  }

  needsRehash(_hash: string): boolean {
    throw new Error('PasswordHasher.needsRehash deve ser mockado no teste');
  }
}

export class SignInService {
  signIn(_userId: string, _options?: unknown): Promise<{ session: { mfa?: string } }> {
    throw new Error('SignInService.signIn deve ser mockado no teste');
  }
}

export class AuthenticationRegistry {
  registerProvider(_provider: unknown): void {}
}

export class SessionCookieProvider<T> {
  protected validate(_session: SessionRecord): T | Promise<T> {
    throw new Error('not implemented');
  }
}

export interface SessionRecord {
  userId: string;
  [key: string]: unknown;
}

export const Public = (): ClassDecorator & MethodDecorator => () => undefined;

export class AuthenticationModule {
  static forRootAsync() {
    return { module: AuthenticationModule };
  }
}
