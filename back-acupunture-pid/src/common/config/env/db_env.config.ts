import { z } from 'zod';

export const dbEnvSchema = z.object({
    DATABASE_ENABLED: z
      .string()
      .optional()
      .transform((val) => val === 'true'),
    POSTGRE_DB_HOST: z.string().optional(),
    POSTGRE_DB_PORT: z.coerce.number().default(5432),
    POSTGRE_DB_USER: z.string().optional(),
    POSTGRE_DB_PASS: z.string().optional(),
    POSTGRE_DB_NAME: z.string().optional(),
}).superRefine((data, ctx) => {
    // SE o banco estiver ativado, valida a obrigatoriedade dos campos
    if (data.DATABASE_ENABLED) {
      if (!data.POSTGRE_DB_HOST) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'DB_HOST é obrigatório quando o banco está ativo', path: ['DB_HOST'] });
      }
      if (!data.POSTGRE_DB_USER) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'DB_USER é obrigatório quando o banco está ativo', path: ['DB_USER'] });
      }
      if (!data.POSTGRE_DB_PASS) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'DB_PASS é obrigatório quando o banco está ativo', path: ['DB_PASS'] });
      }
      if (!data.POSTGRE_DB_NAME) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'DB_NAME é obrigatório quando o banco está ativo', path: ['DB_NAME'] });
      }
    }
  });

export type DbEnvConfig = z.infer<typeof dbEnvSchema>;

export const dbConfig = () =>{
    const parsed = dbEnvSchema.safeParse(process.env);

    if(!parsed.success){
        console.error('❌ Erro de validação nas variáveis do Banco de Dados:');
        console.error(parsed.error.format());
        throw new Error('Configuração de ambiente do banco de dados inválida.');
    }
    
    return {
    enabled: parsed.data.DATABASE_ENABLED ?? false,
    host: parsed.data.POSTGRE_DB_HOST,
    port: parsed.data.POSTGRE_DB_PORT,
    user: parsed.data.POSTGRE_DB_USER,
    password: parsed.data.POSTGRE_DB_PASS,
    database: parsed.data.POSTGRE_DB_NAME,
  };
}