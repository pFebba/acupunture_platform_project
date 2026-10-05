import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsCpf(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCPF',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;

          // Remove caracteres especiais
          const cpf = value.replace(/[^\d]+/g, '');

          // Valida tamanho e números repetidos conhecidos
          if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

          // Algoritmo de validação do CPF
          const cpfDigits = cpf.split('').map(el => +el);
          const rest = (count: number) => {
            return ((cpfDigits.slice(0, count - 12).reduce((sum, el, index) => sum + el * (count - index), 0) * 10) % 11) % 10;
          };

          return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
        },
        defaultMessage(args: ValidationArguments) {
          return 'O CPF informado é inválido';
        }
      },
    });
  };
}