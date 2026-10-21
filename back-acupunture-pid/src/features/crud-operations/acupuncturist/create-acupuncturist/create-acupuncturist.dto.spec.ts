import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CreateAcupuncturistDTO } from './create-acupuncturist.dto';
import { CreateAcupuncturistResponseDto } from './create-acupuncturist-response.dto';

const validPayload = {
  name: 'Ana',
  cpf: '52998224725',
  email: 'ana@mail.com',
  emailVerified: false,
  password: '123456',
};

const invalidProperties = (payload: object) =>
  validateSync(plainToInstance(CreateAcupuncturistDTO, payload)).map((e) => e.property);

describe('CreateAcupuncturistDTO', () => {
  it('aceita um payload válido', () => {
    expect(invalidProperties(validPayload)).toEqual([]);
  });

  it('aceita telefone opcional', () => {
    expect(invalidProperties({ ...validPayload, phone: '11999999999' })).toEqual([]);
  });

  it.each([
    ['name', { name: '' }],
    ['cpf', { cpf: '12345678900' }],
    ['email', { email: 'nao-e-email' }],
    ['emailVerified', { emailVerified: 'sim' }],
    ['password', { password: '123' }],
    ['password', { password: 'a'.repeat(21) }],
    ['phone', { phone: 11999999999 }],
  ])('rejeita %s inválido', (property, override) => {
    expect(invalidProperties({ ...validPayload, ...override })).toEqual([property]);
  });
});

describe('CreateAcupuncturistResponseDto', () => {
  it('expõe apenas os campos públicos', () => {
    const dto = CreateAcupuncturistResponseDto.fromEntity({
      id: 'a1',
      name: 'Ana',
      email: 'ana@mail.com',
      emailVerified: true,
      cpf: '52998224725',
      password_hash: 'hash',
    });

    expect({ ...dto }).toEqual({ id: 'a1', name: 'Ana', email: 'ana@mail.com', emailVerified: true });
  });
});
