import { compare, genSalt, hash } from 'bcryptjs';

const SALT_RANDOMS = 8;

const hashPassword = async (password: string): Promise<string> => {
  const saltGenerated = await genSalt(SALT_RANDOMS);

  return await hash(password, saltGenerated);
};

const verifyPassword = async (password: string, hashPassword: string): Promise<boolean> => {
  return await compare(password, hashPassword);
};

export const PasswordCrypto = {
  hashPassword,
  verifyPassword
};