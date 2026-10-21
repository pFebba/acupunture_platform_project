import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { SignInDTO } from './sign-in.dto';

const validate = (payload: object) => validateSync(plainToInstance(SignInDTO, payload));

describe('SignInDTO', () => {
  it('aceita e-mail e senha preenchidos', () => {
    expect(validate({ email: 'ana@mail.com', password: '123456' })).toHaveLength(0);
  });

  it('exige e-mail e senha', () => {
    const errors = validate({ email: '', password: '' });

    expect(errors.map((e) => e.property).sort()).toEqual(['email', 'password']);
    expect(errors.find((e) => e.property === 'email')?.constraints?.isNotEmpty).toBe('O email é obrigatório');
    expect(errors.find((e) => e.property === 'password')?.constraints?.isNotEmpty).toBe('A senha é obrigatória');
  });
});
