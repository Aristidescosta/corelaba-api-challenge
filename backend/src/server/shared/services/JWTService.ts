import * as jwt from 'jsonwebtoken';

interface IJWTData {
  uid: number;
}

const signin = (data: IJWTData) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  console.log(JWT_SECRET);
  if (!JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';
  return jwt.sign(data, JWT_SECRET, { expiresIn: '24h' });
};

const verify = (token: string): IJWTData | 'JWT_SECRET_NOT_FOUND' | 'INVALID_TOKEN' => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === 'string') {
      return 'INVALID_TOKEN';
    }
    return decoded as IJWTData;
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (error) {
    return 'INVALID_TOKEN';
  }
};

export const JWTService = {
  signin,
  verify
};