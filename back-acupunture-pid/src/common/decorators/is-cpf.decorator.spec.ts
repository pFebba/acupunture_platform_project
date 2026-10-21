import { validateSync } from 'class-validator';
import { IsCpf } from './is-cpf.decorator';

class CpfHolder {
  @IsCpf()
  cpf: any;
}

const validate = (cpf: any) => {
  const holder = new CpfHolder();
  holder.cpf = cpf;
  return validateSync(holder);
};

describe('IsCpf', () => {
  it.each(['52998224725', '529.982.247-25', '111.444.777-35'])('aceita CPF válido %s', (cpf) => {
    expect(validate(cpf)).toHaveLength(0);
  });

  it.each([
    ['dígito verificador errado', '52998224724'],
    ['tamanho menor que 11', '5299822472'],
    ['tamanho maior que 11', '529982247251'],
    ['todos os dígitos iguais', '11111111111'],
    ['string vazia', ''],
  ])('rejeita CPF com %s', (_, cpf) => {
    expect(validate(cpf)).toHaveLength(1);
  });

  it.each([12345678909, null, undefined, {}])('rejeita valor que não é string (%p)', (cpf) => {
    expect(validate(cpf)).toHaveLength(1);
  });

  it('retorna a mensagem padrão em português', () => {
    const [error] = validate('00000000000');
    expect(error.constraints).toEqual({ isCPF: 'O CPF informado é inválido' });
  });
});
